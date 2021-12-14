import postcss, { Rule } from 'postcss';
import selectorParser from 'postcss-selector-parser';
import plugin from 'tailwindcss/plugin';
import withAlphaVariable, { withAlphaValue } from 'tailwindcss/lib/util/withAlphaVariable';
import { variableConfig, modifierPairMap } from './config';
import { ThemeFunction } from './typings/global';
import { parseClassColor, ClassColor } from './parser';

const wrapMediaDarkRule = (() => {
  const darkRule = postcss.atRule({
    name: 'media',
    params: '(prefers-color-scheme: dark)',
  });
  return (rule: Rule) => {
    rule.replaceWith(
      darkRule.clone({
        nodes: [rule],
      })
    );
  };
})();

const addDarkClass = (() => {
  const parser = selectorParser((selectors) => {
    selectors.each((selector) => {
      const firstChild = selector.at(0);
      selector.insertBefore(firstChild, selectorParser.className({ value: 'dark' }));
      selector.insertBefore(firstChild, selectorParser.combinator({ value: ' ' }));
    });
  });
  return (selector: string) => parser.processSync(selector);
})();

export const getReverseColor = ({
  selector,
  classColor,
  theme,
}: {
  selector: string;
  classColor: ClassColor;
  theme: ThemeFunction;
}): string => {
  if (classColor.shade && classColor.shade in modifierPairMap) {
    return theme(['colors', classColor.color, modifierPairMap[classColor.shade]]);
  } else if (classColor.color in modifierPairMap) {
    return theme(['colors', modifierPairMap[classColor.color]]);
  }
  return '';
};

export const bicolor = ({ variantName = 'bi', getColor = getReverseColor } = {}) =>
  plugin(({ addVariant, config, theme, e: encode, corePlugins }) => {
    const darkMode = config('darkMode', 'media');

    addVariant(variantName, [
      '&',
      ({ container, separator }) => {
        container.walkRules((rule) => {
          // 1. convert `bg-slate-100\/20` to `bg-slate-100/20`
          // 2. `divide-slate-200` will be `.divide-slate-200 > :not([hidden]) ~ :not([hidden])`, convert it to `divide-slate-200`
          const bareSelector = rule.selector.slice(1).replace(/\\\//g, '/').split(' ')[0];
          const classColor = parseClassColor(bareSelector);
          if (!classColor) return;

          const colorConfig = variableConfig[classColor.prefix];

          const color = getColor({ selector: bareSelector, classColor, theme });
          // warn: can't find the color
          if (!color) return;

          rule.walkDecls((decl) => {
            if (colorConfig.attrs.includes(decl.prop)) {
              decl.value = classColor.opacity
                ? withAlphaValue(color, Number(classColor.opacity) / 100)
                : colorConfig.variable && corePlugins(colorConfig.plugin)
                ? withAlphaVariable({
                    color,
                    property: 'color',
                    variable: colorConfig.variable!,
                  }).color
                : color;
            } else if (decl.prop.startsWith('--')) {
              // remove css variables (normal state has declared)
              decl.remove();
              return;
            }
          });

          if (darkMode === 'class') {
            rule.selector = addDarkClass(`.${variantName}${encode(`${separator}${bareSelector}`)}`);
          } else {
            wrapMediaDarkRule(rule);
          }
        });
      },
    ]);
  });

export default bicolor;

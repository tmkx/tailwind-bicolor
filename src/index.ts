import plugin from 'tailwindcss/plugin';
import withAlphaVariable from 'tailwindcss/lib/util/withAlphaVariable';
import { variableConfig, modifierPairMap } from './config';
import { ThemeFunction } from './typings/global';
import { parseClassColor, ClassColor } from './parser';

const getDarkColor = ({
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

export const bicolor = ({ variantName = 'bi', getColor = getDarkColor } = {}) =>
  plugin(({ addVariant, theme, e: encode, corePlugins }) => {
    addVariant(variantName, [
      '&',
      ({ container }) => {
        container.walkRules((rule) => {
          const bareSelector = rule.selector.slice(1);
          const classColor = parseClassColor(bareSelector);
          if (!classColor) return;

          const colorConfig = variableConfig[classColor.prefix];

          const color = getColor({ selector: bareSelector, classColor, theme });
          // warn: can't find the color
          if (!color) return;

          rule.selector = `.dark .${variantName}${encode(`:${bareSelector}`)}`;
          rule.walkDecls((decl) => {
            if (colorConfig.attrs.includes(decl.prop)) {
              decl.value =
                colorConfig.variable && corePlugins(colorConfig.plugin)
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
        });
      },
    ]);
  });

export default bicolor;

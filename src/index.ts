import plugin from 'tailwindcss/plugin';
import withAlphaVariable from 'tailwindcss/lib/util/withAlphaVariable';

const modifierPairMap: Record<string, string> = {
  white: 'black',
  black: 'white',
  50: '900',
  100: '800',
  200: '700',
  300: '600',
  400: '500',
  500: '400',
  600: '300',
  700: '200',
  800: '100',
  900: '50',
};

const getDarkColor = ({
  selector,
  colorCode,
  theme,
}: {
  selector: string;
  colorCode: string;
  theme: (path: string | string[], defaultValue?: string) => string;
}): string => {
  const path = colorCode.split('-');
  const modifier = path.pop();

  if (modifier && modifier in modifierPairMap) {
    // return theme(`colors.${path.join('.')}.${modifierPairMap[modifier]}`);
    return theme(['colors', ...path, modifierPairMap[modifier]]);
  }

  return '';
};

const variableConfig: Record<string, { prefix: string; plugin: string; variable: string }> = {
  'background-color': { prefix: 'bg', plugin: 'backgroundOpacity', variable: '--tw-bg-opacity' },
  color: { prefix: 'text', plugin: 'textOpacity', variable: '--tw-text-opacity' },
};

const prefixes = Object.values(variableConfig).map(({ prefix }) => prefix);

export const bicolor = ({ variantName = 'bi', getColor = getDarkColor } = {}) =>
  plugin(({ addVariant, theme, e: encode, corePlugins }) => {
    addVariant(variantName, [
      '&',
      ({ container }) => {
        container.walkRules((rule) => {
          const bareSelector = rule.selector.slice(1);
          if (prefixes.every((prefix) => !bareSelector.startsWith(`${prefix}-`))) return;

          // get color name
          const colorCode = bareSelector.replace(/^\w+\-/, '');
          const color = getColor({ selector: bareSelector, colorCode, theme });
          // warn: can't find the color
          if (!color) return;

          rule.selector = `.dark .${variantName}${encode(`:${bareSelector}`)}`;
          rule.walkDecls((decl) => {
            if (decl.prop.startsWith('--')) {
              // remove css variables (normal state has declared)
              decl.remove();
              return;
            }

            if (decl.prop in variableConfig && bareSelector.startsWith(`${variableConfig[decl.prop].prefix}-`)) {
              decl.value = corePlugins(variableConfig[decl.prop].plugin)
                ? withAlphaVariable({
                    color,
                    property: 'color',
                    variable: variableConfig[decl.prop].variable,
                  }).color
                : color;
            }
          });
        });
      },
    ]);
  });

export default bicolor;

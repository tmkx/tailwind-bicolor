export const variableConfig: Record<
  // prefix
  string,
  {
    // class attributes
    attrs: string[];
    // should enable opacity
    plugin?: string;
    // opacity variable
    variable?: string;
  }
> = {
  bg: { attrs: ['background-color'], plugin: 'backgroundOpacity', variable: '--tw-bg-opacity' },
  text: { attrs: ['color'], plugin: 'textOpacity', variable: '--tw-text-opacity' },
  decoration: { attrs: ['text-decoration-color'] },
  'border-x': {
    attrs: ['border-left-color', 'border-right-color'],
    plugin: 'borderOpacity',
    variable: '--tw-border-opacity',
  },
  'border-y': {
    attrs: ['border-top-color', 'border-bottom-color'],
    plugin: 'borderOpacity',
    variable: '--tw-border-opacity',
  },
  'border-t': { attrs: ['border-top-color'], plugin: 'borderOpacity', variable: '--tw-border-opacity' },
  'border-r': { attrs: ['border-right-color'], plugin: 'borderOpacity', variable: '--tw-border-opacity' },
  'border-b': { attrs: ['border-bottom-color'], plugin: 'borderOpacity', variable: '--tw-border-opacity' },
  'border-l': { attrs: ['border-left-color'], plugin: 'borderOpacity', variable: '--tw-border-opacity' },
  border: { attrs: ['border-color'], plugin: 'borderOpacity', variable: '--tw-border-opacity' },
  outline: { attrs: ['outline-color'] },
  accent: { attrs: ['accent-color'] },
  caret: { attrs: ['caret-color'] },
  fill: { attrs: ['fill'] },
  stroke: { attrs: ['stroke'] },
  divide: { attrs: ['border-color'], plugin: 'divideOpacity', variable: '--tw-divide-opacity' },
  shadow: { attrs: ['--tw-shadow-color'] },
  'ring-offset': { attrs: ['--tw-ring-offset-color'] },
  ring: { attrs: ['--tw-ring-color'], plugin: 'ringOpacity', variable: '--tw-ring-opacity' },
};

export const prefixes = Object.keys(variableConfig);

export const modifierPairMap: Record<string, string> = {
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

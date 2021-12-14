import postcss from 'postcss';
import tailwind from 'tailwindcss';
import { withAlphaValue, default as _withAlphaVariable } from 'tailwindcss/lib/util/withAlphaVariable';

function isPlugin(pluginOrConfig?: unknown): boolean {
  return (
    !!pluginOrConfig && typeof pluginOrConfig === 'object' && 'handler' in pluginOrConfig && 'config' in pluginOrConfig
  );
}

export function createProcessor(pluginOrConfig?: unknown) {
  const processor = postcss([
    tailwind(
      isPlugin(pluginOrConfig)
        ? {
            plugins: [pluginOrConfig],
          }
        : pluginOrConfig
    ),
  ]);

  return (css: string) =>
    new Promise<string>((resolve, reject) => {
      processor
        .process(css, { from: undefined })
        .then((result) => resolve(result.css))
        .catch((err) => reject(err));
    });
}

export function createCompiler(pluginOrConfig?: unknown) {
  const processor = createProcessor(pluginOrConfig);
  return (css: string) => processor(css);
}

export function createClassNamesCompiler(pluginOrConfig?: unknown, ruleName = '.test') {
  const processor = createProcessor(pluginOrConfig);
  return (classNames: string) => processor(`${ruleName} { @apply ${classNames}; }`);
}

export function findStringCount(haystack: string, needle: string) {
  let count = 0;
  let index = -1;
  while ((index = haystack.indexOf(needle, index + 1)) > -1) {
    ++count;
  }
  return count;
}

export function withAlphaVariable(color: string, variable: string) {
  return _withAlphaVariable({
    color,
    property: 'color',
    variable,
  }).color;
}

export { withAlphaValue };

import tailwind from 'tailwindcss';
import postcss from 'postcss';

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

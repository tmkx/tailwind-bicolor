declare module 'tailwindcss/plugin' {
  type VariantFunctions = (helpers: {
    modifySelectors: any;
    container: import('postcss/lib/container').default;
    separator: string;
  }) => any;

  type AddVariant = (
    variantName: string,
    variantFunctions: string | VariantFunctions | (string | VariantFunctions)[],
    options?: any
  ) => any;

  export default function plugin(
    plugin: (helpers: {
      /**
       * for registering new static utility styles
       */
      addUtilities: any;
      /**
       * for registering new static component styles
       */
      addComponents: any;
      /**
       * for registering new base styles
       */
      addBase: any;
      /**
       * for registering custom variants
       */
      addVariant: AddVariant;
      /**
       * for manually escaping strings meant to be used in class names
       */
      e: (name: string) => string;
      /**
       * for looking up values in the user’s theme configuration
       */
      theme: (path: string, defaultValue?: string) => string;
      /**
       * for looking up values in the user’s Tailwind configuration
       */
      config: any;
      postcss: any;
      /**
       * for checking if a core plugin is enabled
       */
      corePlugins: any;
    }) => void,
    config?: any
  ): any;
}

declare module 'tailwindcss/lib/util/withAlphaVariable' {
  export default function withAlphaVariable(params: {
    color: string | Function;
    property: string;
    variable: string;
  }): Record<string, string>;
}

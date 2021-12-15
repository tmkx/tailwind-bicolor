<template>
  <div>
    <Header />

    <div class="container m-auto px-6">
      <Highlight title="Easy to use" lang="html" :code="introCode" />

      <div class="space-y-6 mt-6">
        <h2 class="mt-6 text-xl font-bold">Demos</h2>
        <Buttons />
        <Texts />
      </div>

      <Highlight title="Simple Config" lang="javascript" :code="simpleConfigCode" />

      <Highlight title="Customize Config" lang="javascript" :code="advancedConfigCode" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from './components/Header.vue';
import Highlight from './components/Highlight.vue';
import Buttons from './components/Buttons.vue';
import Texts from './components/Texts.vue';

const introCode = `<div class="bg-white dark:bg-black"></div>
<!-- Replace with below ↓↓↓ -->
<div class="bi:bg-white"></div>`;

const simpleConfigCode = `// tailwind.config.js
const { bicolor } = require('tailwind-bicolor');

module.exports = {
  // ...
  plugins: [
    // bicolor will auto convert:
    // - \`white\` to \`black\` and vice versa
    // - \`50\` to \`900\`
    // - \`100\` to \`800\`
    // - \`200\` to \`700\`
    // - ...
    bicolor(),
  ],
};`;

const advancedConfigCode = `const { bicolor } = require('tailwind-bicolor');

module.exports = {
  // ...
  plugins: [
    // The exports of package is a function instead of a plugin instance,
    // and it can not be configured by tailwind's \`config\` property.
    // The function is fully typed.
    bicolor({
      variantName: 'bi',
      // handle your custom color reflection
      getColor({ selector, classColor, theme }) {
        if (classColor.color === 'green' && classColor.shade) {
          return theme(\`colors.blue.\${classColor.shade}\`);
        }
        // ignore
        return '';
      },
    }),
  ],
};`;
</script>

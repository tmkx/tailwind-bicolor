<template>
  <div>
    <h3 v-if="props.title" class="mt-6 text-xl font-bold">{{ props.title }}</h3>
    <pre class="my-2"><code ref="codeRef" :class="`rounded language-${props.lang}`">{{props.code}}</code></pre>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import highlight from 'highlight.js/es/core';
// @ts-ignore
import langXml from 'highlight.js/es/languages/xml';
// @ts-ignore
import langJs from 'highlight.js/es/languages/javascript';

highlight.registerLanguage('html', langXml);
highlight.registerLanguage('javascript', langJs);

const props = defineProps<{
  title?: string;
  lang: string;
  code: string;
}>();

const codeRef = ref<HTMLElement>();

onMounted(() => {
  highlight.highlightElement(codeRef.value!);
});
</script>

<style lang="scss">
@import 'highlight.js/scss/base16/materia.scss';
</style>

<template>
  <div>
    <h3 class="text-lg font-bold">Texts</h3>
    <div class="-m-2 whitespace-normal">
      <span v-for="color in textColors" :class="`inline-block px-5 py-1 m-2 ${color[1]}`">
        {{ color[0] }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const textColors = ref([
  ['Slate', 'bi:text-slate-700'],
  ['Gray', 'bi:text-gray-700'],
  ['Zinc', 'bi:text-zinc-700'],
  ['Neutral', 'bi:text-neutral-700'],
  ['Stone', 'bi:text-stone-700'],
  ['Red', 'bi:text-red-700'],
  ['Orange', 'bi:text-orange-700'],
  ['Amber', 'bi:text-amber-700'],
  ['Yellow', 'bi:text-yellow-700'],
  ['Lime', 'bi:text-lime-700'],
  ['Green', 'bi:text-green-700'],
  ['Emerald', 'bi:text-emerald-700'],
  ['Teal', 'bi:text-teal-700'],
  ['Cyan', 'bi:text-cyan-700'],
  ['Sky', 'bi:text-sky-700'],
  ['Blue', 'bi:text-blue-700'],
  ['Indigo', 'bi:text-indigo-700'],
  ['Violet', 'bi:text-violet-700'],
  ['Purple', 'bi:text-purple-700'],
  ['Fuchsia', 'bi:text-fuchsia-700'],
  ['Pink', 'bi:text-pink-700'],
  ['Rose', 'bi:text-rose-700'],
]);
</script>

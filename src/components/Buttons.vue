<template>
  <div>
    <h3 class="text-lg font-bold">Buttons</h3>
    <div class="-m-2">
      <button v-for="color in buttonColors" :class="`px-5 py-1 m-2 rounded text-slate-200 ${color[1]}`">
        {{ color[0] }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const buttonColors = ref([
  ['Slate', 'bi:bg-slate-500'],
  ['Gray', 'bi:bg-gray-500'],
  ['Zinc', 'bi:bg-zinc-500'],
  ['Neutral', 'bi:bg-neutral-500'],
  ['Stone', 'bi:bg-stone-500'],
  ['Red', 'bi:bg-red-500'],
  ['Orange', 'bi:bg-orange-500'],
  ['Amber', 'bi:bg-amber-500'],
  ['Yellow', 'bi:bg-yellow-500'],
  ['Lime', 'bi:bg-lime-500'],
  ['Green', 'bi:bg-green-500'],
  ['Emerald', 'bi:bg-emerald-500'],
  ['Teal', 'bi:bg-teal-500'],
  ['Cyan', 'bi:bg-cyan-500'],
  ['Sky', 'bi:bg-sky-500'],
  ['Blue', 'bi:bg-blue-500'],
  ['Indigo', 'bi:bg-indigo-500'],
  ['Violet', 'bi:bg-violet-500'],
  ['Purple', 'bi:bg-purple-500'],
  ['Fuchsia', 'bi:bg-fuchsia-500'],
  ['Pink', 'bi:bg-pink-500'],
  ['Rose', 'bi:bg-rose-500'],
]);
</script>

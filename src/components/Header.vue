<template>
  <header class="max-w-5xl m-auto flex justify-between leading-10 mb-6">
    <div>tailwind-bicolor</div>
    <div>
      <button class="bi:bg-blue-500 text-white text-sm py-1 px-2 rounded" @click="handleToggleTheme">Toggle Theme</button>
    </div>
  </header>
</template>

<script setup lang="ts">
function handleToggleTheme() {
  document.documentElement.classList.toggle('dark');
}
</script>

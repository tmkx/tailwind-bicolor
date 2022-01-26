<template>
  <header class="mb-6 py-2 sticky top-0 bi:bg-slate-50">
    <div class="container m-auto flex justify-between px-6 leading-10">
      <div>tailwind-bicolor</div>
      <div class="flex items-center">
        <a class="mr-4" href="https://github.com/tmkx/tailwind-bicolor"><img src="https://img.shields.io/github/stars/tmkx/tailwind-bicolor?style=social" /></a>
        <button class="bi:bg-blue-500 text-white text-sm py-1 px-2 rounded" @click="handleToggleTheme">
          Toggle Theme
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
function handleToggleTheme() {
  document.documentElement.classList.toggle('dark');
}
</script>

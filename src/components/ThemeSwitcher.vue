<script setup lang="ts">
import { useThemeStore } from '@/stores/ThemeStore'

const store = useThemeStore()
const { theme, icon, themeIndex, disabled } = storeToRefs(store)

function toggleTheme() {
  store.nextTheme()
  const html = document.querySelector('html')
  if (!html) return
  // Remueve todas las clases relacionadas con temas
  html.className = html.className
    .split(' ')
    .filter(cls => !store.themes.includes(cls))
    .join(' ')

  // Agrega la clase correspondiente al tema actual (excepto "day")
  if (themeIndex.value !== 0) {
    html.classList.add(theme.value)
  }
}
</script>
<template>
  <div class="relative z-[101]">
    <button
      class="inline-flex w-full justify-center rounded-full bg-primary-500/20 text-white/50 not-disabled:hover:text-white p-2 not-disabled:cursor-pointer not-disabled:hover:bg-primary-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
      @click="toggleTheme()"
      :disabled="disabled"
    >
      <span :class="`${icon}`" class="h-6 w-6"></span>
    </button>
  </div>
</template>

import { defineStore } from 'pinia'

export const useThemeStore = defineStore('ThemeStore', () => {
  const themes = ['day', 'evening', 'night']
  const theme = ref<string>('day')
  const themeIndex = ref(themes.indexOf(theme.value))
  const icons = ['i-mdi-white-balance-sunny', 'i-mdi-weather-sunset', 'i-mdi-weather-night']
  const icon = computed(() => icons[themeIndex.value])
  const disabled = ref(false)

  return {
    // State
    theme,
    themes,
    themeIndex,
    icon,
    icons,
    disabled,

    // Getter

    // Actions
    nextTheme() {
      themeIndex.value = (themeIndex.value + 1) % themes.length
      theme.value = themes[themeIndex.value]
    },
    setTheme(newTheme: string) {
      if (themes.includes(newTheme)) {
        theme.value = newTheme
      }
    },
  }
})

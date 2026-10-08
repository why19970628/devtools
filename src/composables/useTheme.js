import { ref, computed, readonly } from 'vue'

const THEME_KEY = 'devtools_theme'
const MANUAL_KEY = 'devtools_theme_manual'
const STORAGE = typeof localStorage !== 'undefined' ? localStorage : null

function currentHourTheme() {
  const hour = new Date().getHours()
  return (hour >= 6 && hour < 18) ? 'light' : 'dark'
}

const stored = STORAGE && STORAGE.getItem(THEME_KEY)
const manual = ref(STORAGE && STORAGE.getItem(MANUAL_KEY) === 'true')
const theme = ref(manual.value && (stored === 'light' || stored === 'dark') ? stored : 'auto')

function apply() {
  const target = theme.value === 'auto' ? currentHourTheme() : theme.value
  document.documentElement.setAttribute('data-theme', target)
}

function set(mode) {
  theme.value = mode
  manual.value = mode !== 'auto'
  if (STORAGE) {
    STORAGE.setItem(THEME_KEY, mode)
    if (manual.value) STORAGE.setItem(MANUAL_KEY, 'true')
    else STORAGE.removeItem(MANUAL_KEY)
  }
  apply()
}

function toggle() {
  set(theme.value === 'light' ? 'dark' : 'light')
}

apply()
if (!manual.value) setInterval(apply, 60000)

export function useTheme() {
  return {
    theme: readonly(theme),
    manual: readonly(manual),
    effective: computed(() => theme.value === 'auto' ? currentHourTheme() : theme.value),
    set,
    toggle,
  }
}
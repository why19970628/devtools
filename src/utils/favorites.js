import { reactive, computed } from 'vue'

const FAV_KEY = 'devtools_favorites'
const state = reactive({ ids: load() })

function load() {
  try {
    return JSON.parse(localStorage.getItem(FAV_KEY)) || []
  } catch {
    return []
  }
}

function save() {
  localStorage.setItem(FAV_KEY, JSON.stringify(state.ids))
}

export function useFavorites() {
  function toggle(id) {
    const i = state.ids.indexOf(id)
    if (i >= 0) state.ids.splice(i, 1)
    else state.ids.push(id)
    save()
  }
  function remove(id) {
    const i = state.ids.indexOf(id)
    if (i >= 0) { state.ids.splice(i, 1); save() }
  }
  function clear() { state.ids.splice(0); save() }
  return {
    ids: computed(() => state.ids.slice()),
    isFav: (id) => state.ids.includes(id),
    toggle,
    remove,
    clear,
  }
}
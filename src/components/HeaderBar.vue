<template>
  <header class="header-bar">
    <div class="header-left">
      <a class="brand" href="/" @click.prevent="$emit('home')">
        <span class="brand-icon">🔧</span>
        <span>DevTools</span>
        <span class="brand-badge">{{ t('brandBadge') }}</span>
      </a>
    </div>

    <div class="header-center">
      <div class="search-trigger" @click="$emit('open-search')">
        <span>🔍</span>
        <span class="search-text">{{ t('searchPlaceholder') }}</span>
        <span class="shortcut-kbd">Ctrl K</span>
      </div>
    </div>

    <div class="header-right">
      <button class="icon-btn lang-btn" title="中文 / English" @click="toggle">{{ lang === 'zh' ? '中' : 'EN' }}</button>
      <div class="dropdown-wrapper">
        <button
          class="fav-toggle-btn"
          :class="{ 'is-fav': favList.length > 0 }"
          @click="favOpen = !favOpen"
        >
          <span class="star-icon">{{ favList.length > 0 ? '★' : '☆' }}</span>
          <span>{{ t('favorites') }}</span>
        </button>
        <div v-if="favOpen" class="dropdown-popover" @click.stop>
          <div class="popover-header">
            <span class="popover-title">{{ t('favoritesTitle') }} ({{ favList.length }})</span>
            <button v-if="favList.length" class="popover-clear-btn" @click="clear">{{ t('clear') }}</button>
          </div>
          <div class="popover-list">
            <div v-if="!favList.length" class="popover-empty">{{ t('favEmpty') }}</div>
            <div
              v-for="tool in favList"
              :key="tool.id"
              class="popover-item"
              @click="go(tool)"
            >
              <span class="popover-icon">{{ tool.icon }}</span>
              <div class="popover-info">
                <div class="popover-name">{{ toolName(tool) }}</div>
                <div class="popover-cat">{{ catName(tool.category) }}</div>
              </div>
              <button class="popover-del-btn" @click.stop="remove(tool.id)">✕</button>
            </div>
          </div>
        </div>
      </div>

      <button class="icon-btn" :title="t('siteMenu')" @click="$emit('open-menu')">☰</button>
      <button class="icon-btn" :title="t('settings')" @click="$emit('open-settings')">⚙︎</button>
      <button class="icon-btn" :title="theme.effective + ' 模式'" @click="theme.toggle">
        {{ theme.effective === 'light' ? '☀️' : '🌙' }}
      </button>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { tools, getCategory } from '../utils/tools'
import { useFavorites } from '../utils/favorites'
import { useTheme } from '../composables/useTheme'
import { useI18n, toolName, categoryName } from '../composables/useI18n'

defineEmits(['home', 'open-search', 'open-menu', 'open-settings'])

const router = useRouter()
const theme = useTheme()
const { ids, remove, clear } = useFavorites()
const { lang, toggle, t } = useI18n()

const favOpen = ref(false)
const favList = computed(() => ids.value.map(id => tools.find(t => t.id === id)).filter(Boolean))

function catName(categoryId) {
  const cat = getCategory(categoryId)
  return cat ? categoryName(cat) : categoryId
}

function go(tool) {
  favOpen.value = false
  router.push(tool.path)
}

function onDocClick(e) {
  if (!favOpen.value) return
  if (!e.target.closest('.fav-toggle-btn') && !e.target.closest('.dropdown-popover')) {
    favOpen.value = false
  }
}
onMounted(() => document.addEventListener('click', onDocClick))
onBeforeUnmount(() => document.removeEventListener('click', onDocClick))
</script>
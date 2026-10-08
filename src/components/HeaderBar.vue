<template>
  <header class="header-bar">
    <div class="header-left">
      <a class="brand" href="/" @click.prevent="$emit('home')">
        <span class="brand-icon">🔧</span>
        <span>DevTools</span>
        <span class="brand-badge">开发者在线效率工具箱</span>
      </a>
    </div>

    <div class="header-center">
      <div class="search-trigger" @click="$emit('open-search')">
        <span>🔍</span>
        <span class="search-text">搜索工具、类别、路径...</span>
        <span class="shortcut-kbd">Ctrl K</span>
      </div>
    </div>

    <div class="header-right">
      <div class="dropdown-wrapper">
        <button
          class="fav-toggle-btn"
          :class="{ 'is-fav': favList.length > 0 }"
          @click="favOpen = !favOpen"
        >
          <span class="star-icon">{{ favList.length > 0 ? '★' : '☆' }}</span>
          <span>收藏</span>
        </button>
        <div v-if="favOpen" class="dropdown-popover" @click.stop>
          <div class="popover-header">
            <span class="popover-title">我的收藏 ({{ favList.length }})</span>
            <button v-if="favList.length" class="popover-clear-btn" @click="clear">清空</button>
          </div>
          <div class="popover-list">
            <div v-if="!favList.length" class="popover-empty">还没有收藏任何工具，点击工具卡片的 ☆ 即可收藏</div>
            <div
              v-for="tool in favList"
              :key="tool.id"
              class="popover-item"
              @click="go(tool)"
            >
              <span class="popover-icon">{{ tool.icon }}</span>
              <div class="popover-info">
                <div class="popover-name">{{ tool.name }}</div>
                <div class="popover-cat">{{ toolCategory(tool) }}</div>
              </div>
              <button class="popover-del-btn" @click.stop="remove(tool.id)">✕</button>
            </div>
          </div>
        </div>
      </div>

      <button class="icon-btn" title="全站菜单" @click="$emit('open-menu')">☰</button>
      <button class="icon-btn" title="设置" @click="$emit('open-settings')">⚙︎</button>
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

defineEmits(['home', 'open-search', 'open-menu', 'open-settings'])

const router = useRouter()
const theme = useTheme()
const { ids, remove, clear } = useFavorites()

const favOpen = ref(false)
const favList = computed(() => ids.value.map(id => tools.find(t => t.id === id)).filter(Boolean))

function toolCategory(tool) {
  return getCategory(tool.category)?.name || ''
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
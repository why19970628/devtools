<template>
  <div class="app-layout">
    <HeaderBar
      @home="goHome"
      @open-search="searchOpen = true"
      @open-menu="menuOpen = true"
      @open-settings="settingsOpen = true"
    />

    <div class="app-main-body">
      <SideNav :collapsed="sidebarCollapsed" @toggle="sidebarCollapsed = !sidebarCollapsed"
        @pick-category="pickCategory" />

      <div class="app-content-area">
        <HorizontalNav v-if="route.path === '/'" :active="activeCategory" @pick="pickCategory" />

        <div class="app-view-container">
          <div class="view-mount">
            <router-view v-slot="{ Component }">
              <component :is="Component" :key="route.path" />
            </router-view>
          </div>
        </div>

        <AppFooter />
      </div>
    </div>

    <QuickSearchModal :open="searchOpen" @open="searchOpen = true" @close="searchOpen = false" />
    <GlobalMenuModal :open="menuOpen" @close="menuOpen = false" />
    <SettingsModal :open="settingsOpen" @close="settingsOpen = false" />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import HeaderBar from './components/HeaderBar.vue'
import SideNav from './components/SideNav.vue'
import HorizontalNav from './components/HorizontalNav.vue'
import QuickSearchModal from './components/QuickSearchModal.vue'
import GlobalMenuModal from './components/GlobalMenuModal.vue'
import SettingsModal from './components/SettingsModal.vue'
import AppFooter from './components/AppFooter.vue'
import { getToolsByCategory } from './utils/tools'
import { activeCategory } from './utils/nav'

const router = useRouter()
const route = useRoute()
const sidebarCollapsed = ref(false)

const searchOpen = ref(false)
const menuOpen = ref(false)
const settingsOpen = ref(false)

function goHome() {
  activeCategory.value = null
  router.push('/')
}

function pickCategory(catId) {
  activeCategory.value = catId
  if (route.path !== '/') router.push('/')
}

watch(() => route.path, (path) => {
  for (const cat of ['json', 'enc', 'format', 'convert', 'frontend', 'backend', 'network', 'docs', 'othertools', 'iot', 'openplatform', 'resources']) {
    if (getToolsByCategory(cat).some(t => t.path === path)) {
      activeCategory.value = cat
      return
    }
  }
  if (path === '/') return
  activeCategory.value = null
}, { immediate: true })
</script>
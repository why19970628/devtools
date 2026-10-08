<template>
  <aside class="sidebar" :class="{ collapsed }">
    <div class="sidebar-toggle">
      <button class="icon-btn" :title="collapsed ? t('navExpand') : t('navCollapse')" @click="$emit('toggle')">
        {{ collapsed ? '▸' : '◂' }}
      </button>
    </div>

    <template v-if="collapsed">
      <div class="sidebar-scroll">
        <button
          v-for="cat in categories"
          :key="cat.id"
          class="nav-link cat-icon-only"
          :class="{ active: activeCategory === cat.id }"
          :title="categoryName(cat)"
          @click="$emit('pick-category', cat.id)"
        >
          <span class="tool-icon">{{ cat.icon }}</span>
        </button>
      </div>
    </template>

    <template v-else>
      <div class="sidebar-scroll">
        <div v-for="cat in categories" :key="cat.id" class="category-group">
          <div class="side-cat-title">
            <span>{{ cat.icon }}</span>
            <span>{{ categoryName(cat) }}</span>
            <span style="margin-left:auto;font-size:10px">{{ groupTools(cat.id).length }}</span>
          </div>
          <ul class="nav-list">
            <li v-for="tool in groupTools(cat.id)" :key="tool.id">
              <button
                class="nav-link"
                :class="{ active: activeToolId === tool.id }"
                @click="go(tool)"
              >
                <span class="tool-icon">{{ tool.icon }}</span>
                <span class="tool-name">{{ toolName(tool) }}</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </template>
  </aside>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { categories, tools, getToolsByCategory } from '../utils/tools'
import { useI18n, toolName, categoryName } from '../composables/useI18n'

defineProps({ collapsed: Boolean })
defineEmits(['toggle', 'pick-category'])

const { t } = useI18n()

const router = useRouter()
const route = useRoute()
const activeToolId = ref(null)
const activeCategory = ref(null)

function groupTools(catId) {
  return getToolsByCategory(catId)
}
function go(tool) {
  router.push(tool.path)
}

watch(() => route.path, (path) => {
  const tool = tools.find(t => t.path === path)
  activeToolId.value = tool ? tool.id : null
  activeCategory.value = tool ? tool.category : null
}, { immediate: true })
</script>

<style scoped>
.cat-icon-only { justify-content: center; padding: 10px 0; }
</style>
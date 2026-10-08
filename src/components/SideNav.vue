<template>
  <aside class="sidebar" :class="{ collapsed }">
    <div class="sidebar-toggle">
      <button class="icon-btn" :title="collapsed ? '展开' : '收起'" @click="$emit('toggle')">
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
          :title="cat.name"
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
            <span>{{ cat.name }}</span>
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
                <span class="tool-name">{{ tool.name }}</span>
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

defineProps({ collapsed: Boolean })
defineEmits(['toggle', 'pick-category'])

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
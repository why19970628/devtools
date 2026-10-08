<template>
  <div v-if="open" class="modal-backdrop" @click.self="$emit('close')">
    <div class="search-modal">
      <div class="search-bar">
        <span class="search-ico">🔍</span>
        <input
          ref="inputEl"
          v-model="keyword"
          class="search-input"
          type="text"
          placeholder="搜索工具、类别、路径..."
          @input="resetActive"
          @keydown="onKey"
        />
        <button class="modal-close" @click="$emit('close')">✕</button>
      </div>

      <div v-if="!keyword.trim()" class="popover-empty" style="padding:32px 0">
        输入关键词检索全站 {{ tools.length }} 个工具，或按 Ctrl + K 快速弹出
      </div>

      <div v-else-if="!results.length" class="popover-empty" style="padding:32px 0">
        未找到与 "{{ keyword }}" 匹配的工具
      </div>

      <div v-else class="search-list">
        <div
          v-for="(tool, i) in results"
          :key="tool.id"
          class="search-item"
          :class="{ active: i === activeIndex }"
          @mouseenter="activeIndex = i"
          @click="go(tool)"
        >
          <span class="search-item-icon">{{ tool.icon }}</span>
          <div class="search-item-info">
            <div class="search-item-name">
              {{ tool.name }}
              <span style="font-size:11px;color:var(--text-muted)">{{ toolCategory(tool) }}</span>
            </div>
            <div class="search-item-desc">{{ tool.desc }}</div>
          </div>
        </div>
      </div>

      <div class="search-footer">
        <span><kbd>↑</kbd><kbd>↓</kbd> 选择</span>
        <span><kbd>Enter</kbd> 打开</span>
        <span><kbd>Esc</kbd> 关闭</span>
        <span style="margin-left:auto">共 {{ results.length }} 个结果</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { tools, getCategory, searchTools } from '../utils/tools'

const props = defineProps({ open: Boolean })
const emit = defineEmits(['open', 'close'])

const router = useRouter()
const keyword = ref('')
const activeIndex = ref(0)
const inputEl = ref(null)

const results = computed(() => searchTools(keyword.value))

function toolCategory(tool) {
  return getCategory(tool.category)?.name || ''
}
function resetActive() { activeIndex.value = 0 }

function go(tool) {
  emit('close')
  router.push(tool.path)
  keyword.value = ''
}

function onKey(e) {
  if (e.key === 'Escape') emit('close')
  else if (e.key === 'ArrowDown') { e.preventDefault(); activeIndex.value = (activeIndex.value + 1) % results.value.length }
  else if (e.key === 'ArrowUp') { e.preventDefault(); activeIndex.value = (activeIndex.value - 1 + results.value.length) % results.value.length }
  else if (e.key === 'Enter' && results.value.length) { go(results.value[activeIndex.value]) }
}

async function focusInput() {
  await nextTick()
  inputEl.value?.focus()
  keyword.value = ''
}
watch(() => props.open, (o) => { if (o) focusInput() }, { immediate: true })

function globalKey(e) {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault()
    emit(props.open ? 'close' : 'open')
  }
}
onMounted(() => document.addEventListener('keydown', globalKey))
onBeforeUnmount(() => document.removeEventListener('keydown', globalKey))
</script>
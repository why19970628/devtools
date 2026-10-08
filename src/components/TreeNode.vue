<template>
  <div class="tree-node">
    <div class="node-content" @click="toggle">
      <span v-if="isExpandable" class="toggle-icon">{{ expanded ? '▼' : '▶' }}</span>
      <span v-else class="toggle-icon-placeholder"></span>
      <span class="node-key" v-if="keyName !== null">{{ keyName }}:</span>
      <span :class="['node-value', valueType]">{{ displayValue }}</span>
      <span class="node-type-badge">{{ typeBadge }}</span>
    </div>
    <div v-if="expanded && isExpandable" class="node-children">
      <TreeNode
        v-for="(childKey, index) in childKeys"
        :key="childKey"
        :key-name="childKey"
        :data="data[childKey]"
        :depth="depth + 1"
        :expand-signal="expandSignal"
        @update:expand-signal="$emit('update:expand-signal', $event)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  keyName: { type: [String, Number], default: null },
  data: { type: [Object, Array, String, Number, Boolean, null], required: true },
  depth: { type: Number, default: 0 },
  expandSignal: { type: Number, default: 0 },
})

const emit = defineEmits(['update:expand-signal'])

const expanded = ref(props.depth < 2)

watch(() => props.expandSignal, () => {
  expanded.value = !expanded.value
})

const isExpandable = computed(() => {
  return props.data && typeof props.data === 'object' && Object.keys(props.data).length > 0
})

const childKeys = computed(() => {
  if (!isExpandable.value) return []
  return Object.keys(props.data)
})

const valueType = computed(() => {
  if (props.data === null) return 'null'
  if (Array.isArray(props.data)) return 'array'
  return typeof props.data
})

const typeBadge = computed(() => {
  if (props.data === null) return 'null'
  if (Array.isArray(props.data)) return `array[${props.data.length}]`
  if (typeof props.data === 'object') return `object{${Object.keys(props.data).length}}`
  return typeof props.data
})

const displayValue = computed(() => {
  if (props.data === null) return 'null'
  if (typeof props.data === 'string') return `"${props.data}"`
  if (typeof props.data === 'number' || typeof props.data === 'boolean') return String(props.data)
  if (Array.isArray(props.data)) return `[ ${props.data.length} items ]`
  return `{ ${Object.keys(props.data).length} keys }`
})

function toggle() {
  if (isExpandable.value) {
    expanded.value = !expanded.value
  }
}
</script>

<style scoped>
.tree-node {
  font-family: 'SF Mono', 'Fira Code', 'Consolas', monospace;
  font-size: 13px;
  line-height: 1.8;
}

.node-content {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 2px 0;
  cursor: pointer;
  border-radius: 3px;
  padding-left: 4px;
}

.node-content:hover {
  background: var(--bg-hover);
}

.toggle-icon {
  font-size: 10px;
  color: var(--text-muted);
  width: 12px;
  text-align: center;
  flex-shrink: 0;
}

.toggle-icon-placeholder {
  width: 12px;
  flex-shrink: 0;
}

.node-key {
  color: var(--accent);
  font-weight: 500;
}

.node-value.string { color: #a5d6ff; }
.node-value.number { color: #79c0ff; }
.node-value.boolean { color: #ff7b72; }
.node-value.null { color: #8b949e; }
.node-value.array { color: #d2a8ff; }
.node-value.object { color: #d2a8ff; }

.node-type-badge {
  font-size: 10px;
  color: var(--text-muted);
  background: var(--bg-tertiary);
  padding: 1px 6px;
  border-radius: 8px;
  margin-left: 4px;
}

.node-children {
  padding-left: 20px;
  border-left: 1px solid var(--border-color);
  margin-left: 6px;
}
</style>

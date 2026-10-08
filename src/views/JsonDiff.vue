<template>
  <div class="tool-page">
    <div class="page-header">
      <h1>🔀 JSON 对比工具</h1>
      <p>两段 JSON 结构差异对比，高亮标记增删改字段</p>
    </div>

    <div class="io-panel">
      <div class="io-box">
        <div class="io-label"><span>JSON A</span></div>
        <textarea v-model="jsonA" class="io-textarea" placeholder="粘贴第一段 JSON..."></textarea>
      </div>
      <div class="io-box">
        <div class="io-label"><span>JSON B</span></div>
        <textarea v-model="jsonB" class="io-textarea" placeholder="粘贴第二段 JSON..."></textarea>
      </div>
    </div>

    <div class="action-bar">
      <button class="btn btn-primary" @click="compare">开始对比</button>
      <button class="btn" @click="loadExample">加载示例</button>
      <button class="btn" @click="clear">清空</button>
    </div>

    <div v-if="diffResult.length" class="diff-result">
      <div class="card">
        <div class="card-header">
          <span class="card-title">对比结果</span>
          <div>
            <span class="badge badge-success">新增 {{ addedCount }}</span>
            <span class="badge badge-danger" style="margin-left:4px">删除 {{ removedCount }}</span>
            <span class="badge badge-warning" style="margin-left:4px">修改 {{ modifiedCount }}</span>
          </div>
        </div>
        <div class="diff-list">
          <div v-for="(item, idx) in diffResult" :key="idx" class="diff-item" :class="item.type">
            <span class="diff-path">{{ item.path }}</span>
            <span class="diff-type">{{ typeLabel(item.type) }}</span>
            <div class="diff-values">
              <div v-if="item.oldValue !== undefined" class="diff-old">A: {{ item.oldValue }}</div>
              <div v-if="item.newValue !== undefined" class="diff-new">B: {{ item.newValue }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const jsonA = ref(`{
  "name": "DevTools",
  "version": "1.0.0",
  "author": "Admin"
}`)
const jsonB = ref(`{
  "name": "DevTools",
  "version": "1.0.1",
  "author": "Admin",
  "license": "MIT"
}`)
const diffResult = ref([])

const addedCount = computed(() => diffResult.value.filter(d => d.type === 'added').length)
const removedCount = computed(() => diffResult.value.filter(d => d.type === 'removed').length)
const modifiedCount = computed(() => diffResult.value.filter(d => d.type === 'modified').length)

function compare() {
  diffResult.value = []
  if (!jsonA.value.trim() || !jsonB.value.trim()) return
  try {
    const a = JSON.parse(jsonA.value)
    const b = JSON.parse(jsonB.value)
    diffResult.value = diffObjects(a, b, '')
  } catch (e) {
    diffResult.value = [{ path: 'parse-error', type: 'error', oldValue: e.message }]
  }
}

function diffObjects(a, b, path) {
  const result = []
  if (typeof a !== typeof b) {
    result.push({ path: path || '(root)', type: 'modified', oldValue: JSON.stringify(a), newValue: JSON.stringify(b) })
    return result
  }
  if (a && b && typeof a === 'object') {
    const keys = new Set([...Object.keys(a), ...Object.keys(b)])
    for (const key of keys) {
      const newPath = path ? `${path}.${key}` : key
      if (!(key in a)) {
        result.push({ path: newPath, type: 'added', newValue: JSON.stringify(b[key]) })
      } else if (!(key in b)) {
        result.push({ path: newPath, type: 'removed', oldValue: JSON.stringify(a[key]) })
      } else {
        result.push(...diffObjects(a[key], b[key], newPath))
      }
    }
  } else if (a !== b) {
    result.push({ path: path || '(root)', type: 'modified', oldValue: String(a), newValue: String(b) })
  }
  return result
}

function typeLabel(type) {
  return { added: '新增', removed: '删除', modified: '修改', error: '错误' }[type] || type
}

function loadExample() {
  jsonA.value = JSON.stringify({ name: 'test', age: 20, city: 'Beijing', hobbies: ['coding'] }, null, 2)
  jsonB.value = JSON.stringify({ name: 'test', age: 21, city: 'Shanghai', email: 'test@example.com' }, null, 2)
  compare()
}

function clear() {
  jsonA.value = ''
  jsonB.value = ''
  diffResult.value = []
}
</script>

<style scoped>

.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
.diff-result { margin-top: 16px; }
.diff-list { max-height: 500px; overflow-y: auto; }
.diff-item { padding: 8px 12px; border-bottom: 1px solid var(--border-color); display: flex; flex-direction: column; gap: 4px; }
.diff-item:last-child { border-bottom: none; }
.diff-item.added { background: rgba(63,185,80,0.08); }
.diff-item.removed { background: rgba(248,81,73,0.08); }
.diff-item.modified { background: rgba(210,153,34,0.08); }
.diff-path { font-family: monospace; font-size: 13px; font-weight: 500; }
.diff-type { font-size: 11px; }
.diff-values { font-size: 12px; font-family: monospace; }
.diff-old { color: var(--danger); }
.diff-new { color: var(--success); }
</style>

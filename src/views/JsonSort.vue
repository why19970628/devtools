<template>
  <div class="tool-page">
    <ToolHeader />
    <div class="action-bar">
      <select v-model="order" class="lang-select">
        <option value="asc">升序 (A-Z)</option>
        <option value="desc">降序 (Z-A)</option>
      </select>
      <button class="btn btn-primary" @click="sort">排序</button>
      <button class="btn" @click="copyResult">复制结果</button>
    </div>
    <div class="io-panel">
      <div class="io-box">
        <div class="io-label"><span>输入 JSON</span></div>
        <textarea v-model="input" class="io-textarea"></textarea>
      </div>
      <div class="io-box">
        <div class="io-label"><span>排序结果</span></div>
        <textarea v-model="output" class="io-textarea" readonly></textarea>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const input = ref(`{
  "b": 2,
  "c": 3,
  "a": 1,
  "z": 26,
  "m": 13
}`)
const output = ref('')
const order = ref('asc')

function sort() {
  if (!input.value.trim()) { output.value = ''; return }
  try {
    const obj = JSON.parse(input.value)
    output.value = JSON.stringify(sortKeys(obj), null, 2)
  } catch (e) {
    output.value = '错误: ' + e.message
  }
}

function sortKeys(obj) {
  if (Array.isArray(obj)) return obj.map(sortKeys)
  if (obj && typeof obj === 'object') {
    const sorted = Object.keys(obj).sort((a, b) => order.value === 'asc' ? a.localeCompare(b) : b.localeCompare(a))
    return Object.fromEntries(sorted.map(k => [k, sortKeys(obj[k])]))
  }
  return obj
}

function copyResult() { if (output.value) navigator.clipboard.writeText(output.value) }
</script>

<style scoped>

.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
.lang-select { width: 160px; }
</style>

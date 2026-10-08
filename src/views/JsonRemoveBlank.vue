<template>
  <div class="tool-page">
    <ToolHeader />
    <div class="action-bar">
      <button class="btn btn-primary" @click="clean">清理</button>
      <button class="btn" @click="copyResult">复制结果</button>
    </div>
    <div class="io-panel">
      <div class="io-box">
        <div class="io-label"><span>输入 JSON</span></div>
        <textarea v-model="input" class="io-textarea"></textarea>
      </div>
      <div class="io-box">
        <div class="io-label"><span>清理结果</span></div>
        <textarea v-model="output" class="io-textarea" readonly></textarea>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const input = ref(`{
  "name": "test",
  "age": 20,
  "email": "",
  "phone": null,
  "address": {},
  "tags": []
}`)
const output = ref('')

function clean() {
  if (!input.value.trim()) { output.value = ''; return }
  try {
    const obj = JSON.parse(input.value)
    output.value = JSON.stringify(removeEmpty(obj), null, 2)
  } catch (e) {
    output.value = '错误: ' + e.message
  }
}

function removeEmpty(obj) {
  if (Array.isArray(obj)) return obj.map(removeEmpty).filter(v => !isEmpty(v))
  if (obj && typeof obj === 'object') {
    return Object.fromEntries(
      Object.entries(obj).filter(([, v]) => !isEmpty(v)).map(([k, v]) => [k, removeEmpty(v)])
    )
  }
  return obj
}

function isEmpty(v) {
  return v === null || v === '' || (Array.isArray(v) && v.length === 0) || (v && typeof v === 'object' && Object.keys(v).length === 0)
}

function copyResult() { if (output.value) navigator.clipboard.writeText(output.value) }
</script>

<style scoped>

.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
</style>

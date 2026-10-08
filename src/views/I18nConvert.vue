<template>
  <div class="tool-page">
    <ToolHeader />
    <div class="action-bar">
      <select v-model="mode" class="lang-select">
        <option value="json2prop">JSON → Properties</option>
        <option value="prop2json">Properties → JSON</option>
      </select>
      <button class="btn btn-primary" @click="convert">转换</button>
      <button class="btn" @click="copyResult">复制结果</button>
    </div>
    <div class="io-panel">
      <div class="io-box">
        <div class="io-label"><span>输入</span></div>
        <textarea v-model="input" class="io-textarea"></textarea>
      </div>
      <div class="io-box">
        <div class="io-label"><span>输出</span></div>
        <textarea v-model="output" class="io-textarea" readonly></textarea>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const input = ref(`{
  "app": {
    "title": "DevTools",
    "welcome": "欢迎使用",
    "logout": "退出登录"
  },
  "user": {
    "name": "用户名",
    "role": "角色"
  }
}`)
const output = ref('')
const mode = ref('json2prop')

function convert() {
  output.value = ''
  if (!input.value.trim()) return
  try {
    if (mode.value === 'json2prop') {
      const obj = JSON.parse(input.value)
      output.value = flattenToProperties(obj)
    } else {
      output.value = JSON.stringify(parseProperties(input.value), null, 2)
    }
  } catch (e) { output.value = '错误: ' + e.message }
}

function flattenToProperties(obj, prefix = '') {
  let result = ''
  for (const [key, val] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key
    if (val && typeof val === 'object') {
      result += flattenToProperties(val, fullKey)
    } else {
      result += `${fullKey}=${val}\n`
    }
  }
  return result
}

function parseProperties(text) {
  const result = {}
  for (const line of text.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eqIdx = trimmed.indexOf('=')
    if (eqIdx === -1) continue
    const key = trimmed.slice(0, eqIdx).trim()
    const val = trimmed.slice(eqIdx + 1).trim()
    setNestedValue(result, key.split('.'), val)
  }
  return result
}

function setNestedValue(obj, keys, val) {
  let current = obj
  for (let i = 0; i < keys.length - 1; i++) {
    if (!current[keys[i]]) current[keys[i]] = {}
    current = current[keys[i]]
  }
  current[keys[keys.length - 1]] = val
}

function copyResult() { if (output.value) navigator.clipboard.writeText(output.value) }
</script>

<style scoped>

.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
.lang-select { width: 200px; }
</style>

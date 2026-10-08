<template>
  <div class="tool-page">
    <div class="page-header">
      <h1>📄 JSON 格式化校验</h1>
      <p>支持语法校验、代码着色、压缩、转义/去转义、Unicode转中文、转GET参数</p>
    </div>

    <div class="action-bar">
      <button class="btn btn-primary" @click="format">格式化</button>
      <button class="btn" @click="compress">压缩</button>
      <button class="btn" @click="escape">转义</button>
      <button class="btn" @click="unescape">去转义</button>
      <button class="btn" @click="unicodeToChinese">Unicode转中文</button>
      <button class="btn" @click="toGetParams">转GET参数</button>
      <button class="btn" @click="sortKeys">键名排序</button>
      <button class="btn" @click="clear">清空</button>
      <button class="btn" @click="copyResult">复制结果</button>
    </div>

    <div v-if="error" class="error-msg">
      <span class="badge badge-danger">错误</span>
      <pre>{{ error }}</pre>
    </div>

    <div v-if="success" class="success-msg">
      <span class="badge badge-success">JSON 格式正确</span>
    </div>

    <div class="io-panel">
      <div class="io-box">
        <div class="io-label">
          <span>输入 JSON</span>
          <span class="badge">{{ input.length }} 字符</span>
        </div>
        <textarea v-model="input" class="io-textarea" placeholder="在此粘贴 JSON 数据..."></textarea>
      </div>
      <div class="io-box">
        <div class="io-label">
          <span>输出结果</span>
          <span class="badge">{{ output.length }} 字符</span>
        </div>
        <textarea v-model="output" class="io-textarea" readonly placeholder="结果将显示在这里..."></textarea>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const input = ref(`{
  "name": "DevTools",
  "version": "2.0.0",
  "features": ["json", "format", "convert"],
  "settings": {
    "theme": "dark",
    "compact": true,
    "recent": ["json", "sql", "regex"]
  },
  "active": true,
  "count": 42
}`)
const output = ref('')
const error = ref('')
const success = ref(false)

onMounted(format)

function format() {
  error.value = ''
  success.value = false
  if (!input.value.trim()) {
    error.value = '请输入 JSON 数据'
    return
  }
  try {
    const obj = JSON.parse(input.value)
    output.value = JSON.stringify(obj, null, 2)
    success.value = true
  } catch (e) {
    error.value = e.message
  }
}

function compress() {
  error.value = ''
  success.value = false
  if (!input.value.trim()) {
    error.value = '请输入 JSON 数据'
    return
  }
  try {
    const obj = JSON.parse(input.value)
    output.value = JSON.stringify(obj)
    success.value = true
  } catch (e) {
    error.value = e.message
  }
}

function escape() {
  error.value = ''
  success.value = false
  if (!input.value.trim()) {
    error.value = '请输入 JSON 数据'
    return
  }
  try {
    const obj = JSON.parse(input.value)
    output.value = JSON.stringify(obj).replace(/"/g, '\\"')
    success.value = true
  } catch (e) {
    error.value = e.message
  }
}

function unescape() {
  error.value = ''
  success.value = false
  if (!input.value.trim()) {
    error.value = '请输入 JSON 数据'
    return
  }
  try {
    const unescaped = input.value.replace(/\\"/g, '"').replace(/\\\\/g, '\\')
    const obj = JSON.parse(unescaped)
    output.value = JSON.stringify(obj, null, 2)
    success.value = true
  } catch (e) {
    error.value = e.message
  }
}

function unicodeToChinese() {
  error.value = ''
  success.value = false
  if (!input.value.trim()) {
    error.value = '请输入包含 Unicode 转义的字符串'
    return
  }
  try {
    output.value = input.value.replace(/\\u[\dA-Fa-f]{4}/g, (match) =>
      String.fromCharCode(parseInt(match.replace('\\u', ''), 16))
    )
    success.value = true
  } catch (e) {
    error.value = e.message
  }
}

function toGetParams() {
  error.value = ''
  success.value = false
  if (!input.value.trim()) {
    error.value = '请输入 JSON 数据'
    return
  }
  try {
    const obj = JSON.parse(input.value)
    const params = Object.entries(obj)
      .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
      .join('&')
    output.value = params
    success.value = true
  } catch (e) {
    error.value = e.message
  }
}

function sortKeys() {
  error.value = ''
  success.value = false
  if (!input.value.trim()) {
    error.value = '请输入 JSON 数据'
    return
  }
  try {
    const obj = JSON.parse(input.value)
    output.value = JSON.stringify(sortObjectKeys(obj), null, 2)
    success.value = true
  } catch (e) {
    error.value = e.message
  }
}

function sortObjectKeys(obj) {
  if (Array.isArray(obj)) {
    return obj.map(sortObjectKeys)
  }
  if (obj && typeof obj === 'object') {
    return Object.keys(obj).sort().reduce((result, key) => {
      result[key] = sortObjectKeys(obj[key])
      return result
    }, {})
  }
  return obj
}

function clear() {
  input.value = ''
  output.value = ''
  error.value = ''
  success.value = false
}

function copyResult() {
  if (output.value) {
    navigator.clipboard.writeText(output.value)
  }
}
</script>

<style scoped>


.page-header {
  margin-bottom: 20px;
}

.page-header h1 {
  font-size: 22px;
  margin-bottom: 6px;
}

.page-header p {
  color: var(--text-secondary);
  font-size: 13px;
}

.error-msg, .success-msg {
  margin: 12px 0;
  padding: 10px 14px;
  border-radius: var(--radius);
}

.error-msg {
  background: rgba(248,81,73,0.1);
  border: 1px solid rgba(248,81,73,0.3);
}

.error-msg pre {
  margin-top: 8px;
  color: var(--danger);
  font-size: 12px;
  white-space: pre-wrap;
}

.success-msg {
  background: rgba(63,185,80,0.1);
  border: 1px solid rgba(63,185,80,0.3);
}
</style>

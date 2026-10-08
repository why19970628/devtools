<template>
  <div class="tool-page">
    <div class="page-header">
      <h1>🔐 JavaScript 代码混淆器</h1>
      <p>JavaScript 代码混淆加密保护</p>
    </div>
    <div class="action-bar">
      <select v-model="level" class="lang-select">
        <option value="low">低 (变量名混淆)</option>
        <option value="medium">中 (字符串转义)</option>
        <option value="high">高 (完全混淆)</option>
      </select>
      <button class="btn btn-primary" @click="obfuscate">混淆</button>
      <button class="btn" @click="copyResult">复制结果</button>
    </div>
    <div class="io-panel">
      <div class="io-box">
        <div class="io-label"><span>输入代码</span></div>
        <textarea v-model="input" class="io-textarea" placeholder="输入 JavaScript 代码..."></textarea>
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

const input = ref(`function hello() {
  console.log('Hello World!');
}`)
const output = ref('')
const level = ref('medium')

function obfuscate() {
  output.value = ''
  if (!input.value.trim()) return
  let code = input.value
  if (level.value === 'low') {
    code = code.replace(/\b(var|let|const)\s+(\w+)/g, (_, kw, name) => `${kw} _${Math.random().toString(36).slice(2, 8)}`)
  } else if (level.value === 'medium') {
    code = code.replace(/'([^']*)'/g, (_, str) => `'${[...str].map(c => '\\x' + c.charCodeAt(0).toString(16).padStart(2, '0')).join('')}'`)
    code = code.replace(/"([^"]*)"/g, (_, str) => `"${[...str].map(c => '\\x' + c.charCodeAt(0).toString(16).padStart(2, '0')).join('')}"`)
  } else {
    code = code.replace(/'([^']*)'/g, (_, str) => `[${[...str].map(c => c.charCodeAt(0)).join(',')}].map(c=>String.fromCharCode(c)).join('')`)
    code = code.replace(/"([^"]*)"/g, (_, str) => `[${[...str].map(c => c.charCodeAt(0)).join(',')}].map(c=>String.fromCharCode(c)).join('')`)
  }
  output.value = code
}

function copyResult() { if (output.value) navigator.clipboard.writeText(output.value) }
</script>

<style scoped>

.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
.lang-select { width: 180px; }
</style>

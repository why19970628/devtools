<template>
  <div class="tool-page">
    <div class="page-header">
      <h1>🇨🇳 Unicode 中文互转</h1>
      <p>\u4e2d\u6587 形式与普通中文字符串互相转换</p>
    </div>
    <div class="action-bar">
      <select v-model="mode" class="lang-select">
        <option value="toUnicode">中文 → Unicode</option>
        <option value="fromUnicode">Unicode → 中文</option>
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

const input = ref('你好，世界！')
const output = ref('')
const mode = ref('toUnicode')

function convert() {
  output.value = ''
  if (!input.value) return
  if (mode.value === 'toUnicode') {
    output.value = [...input.value].map(c => {
      const code = c.charCodeAt(0)
      return code > 127 ? '\\u' + code.toString(16).padStart(4, '0') : c
    }).join('')
  } else {
    output.value = input.value.replace(/\\u[\dA-Fa-f]{4}/g, m =>
      String.fromCharCode(parseInt(m.slice(2), 16))
    )
  }
}

function copyResult() { if (output.value) navigator.clipboard.writeText(output.value) }
</script>

<style scoped>

.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
.lang-select { width: 180px; }
</style>

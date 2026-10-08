<template>
  <div class="tool-page">
    <div class="page-header">
      <h1>☕ Properties / Unicode 互转</h1>
      <p>Java .properties 配置文件中文与 \u 转义互转</p>
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
        <textarea v-model="input" class="io-textarea" placeholder="key=值 格式"></textarea>
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

const input = ref(`app.title=开发工具
app.desc=实用的在线开发工具集`)

function convert() {
  output.value = ''
  if (!input.value.trim()) return
  const lines = input.value.split('\n')
  output.value = lines.map(line => {
    if (mode.value === 'toUnicode') {
      return [...line].map(ch => {
        const code = ch.charCodeAt(0)
        return code > 127 ? '\\u' + code.toString(16).padStart(4, '0').toUpperCase() : ch
      }).join('')
    } else {
      return line.replace(/\\u([\dA-Fa-f]{4})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
    }
  }).join('\n')
}

function copyResult() { if (output.value) navigator.clipboard.writeText(output.value) }
</script>

<style scoped>

.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
.lang-select { width: 180px; }
</style>

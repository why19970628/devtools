<template>
  <div class="tool-page">
    <ToolHeader />
    <div class="action-bar">
      <select v-model="mode" class="lang-select">
        <option value="toHex">文本 → Hex</option>
        <option value="fromHex">Hex → 文本</option>
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

const input = ref('Hello, Hex!')
const output = ref('')
const mode = ref('toHex')

function convert() {
  output.value = ''
  if (!input.value.trim()) return
  if (mode.value === 'toHex') {
    output.value = [...input.value].map(ch => ch.charCodeAt(0).toString(16).padStart(2, '0').toUpperCase()).join(' ')
  } else {
    const hex = input.value.trim().replace(/\s+/g, '')
    output.value = hex.match(/.{2}/g)?.map(h => String.fromCharCode(parseInt(h, 16))).join('') || ''
  }
}

function copyResult() { if (output.value) navigator.clipboard.writeText(output.value) }
</script>

<style scoped>

.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
.lang-select { width: 160px; }
</style>

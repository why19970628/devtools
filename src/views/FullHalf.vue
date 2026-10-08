<template>
  <div class="tool-page">
    <ToolHeader />
    <div class="action-bar">
      <select v-model="mode" class="lang-select">
        <option value="toFull">半角 → 全角</option>
        <option value="toHalf">全角 → 半角</option>
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

const input = ref('ABC 123! Hello, DevTools?')
const output = ref('')
const mode = ref('toFull')

function convert() {
  output.value = ''
  if (!input.value) return
  if (mode.value === 'toFull') {
    output.value = [...input.value].map(ch => {
      const code = ch.charCodeAt(0)
      if (code === 32) return '\u3000'
      if (code >= 33 && code <= 126) return String.fromCharCode(code + 0xFEE0)
      return ch
    }).join('')
  } else {
    output.value = [...input.value].map(ch => {
      const code = ch.charCodeAt(0)
      if (code === 0x3000) return ' '
      if (code >= 0xFF01 && code <= 0xFF5E) return String.fromCharCode(code - 0xFEE0)
      return ch
    }).join('')
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

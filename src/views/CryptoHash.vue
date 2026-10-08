<template>
  <div class="tool-page">
    <ToolHeader />
    <div class="action-bar">
      <select v-model="algorithm" class="lang-select">
        <option value="MD5">MD5</option>
        <option value="SHA-1">SHA-1</option>
        <option value="SHA-256">SHA-256</option>
        <option value="SHA-512">SHA-512</option>
      </select>
      <button class="btn btn-primary" @click="calculate">计算</button>
      <button class="btn" @click="copyResult">复制结果</button>
    </div>
    <div class="io-panel">
      <div class="io-box">
        <div class="io-label"><span>输入文本</span></div>
        <textarea v-model="input" class="io-textarea"></textarea>
      </div>
      <div class="io-box">
        <div class="io-label"><span>哈希结果</span></div>
        <textarea v-model="output" class="io-textarea" readonly></textarea>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const input = ref('hello world')
const output = ref('')
const algorithm = ref('MD5')

async function calculate() {
  output.value = ''
  if (!input.value) return
  try {
    const encoder = new TextEncoder()
    const data = encoder.encode(input.value)
    const hashBuffer = await crypto.subtle.digest(algorithm.value, data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    output.value = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  } catch (e) {
    output.value = '错误: ' + e.message
  }
}

function copyResult() { if (output.value) navigator.clipboard.writeText(output.value) }
</script>

<style scoped>

.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
.lang-select { width: 140px; }
</style>

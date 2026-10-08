<template>
  <div class="tool-page">
    <div class="page-header">
      <h1>🔗 URL 编码 / 解码</h1>
      <p>URL 地址及参数 encodeURIComponent / decodeURIComponent</p>
    </div>
    <div class="action-bar">
      <select v-model="mode" class="lang-select">
        <option value="encode">编码</option>
        <option value="decode">解码</option>
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

const input = ref('https://example.com/search?q=Hello 世界&lang=zh-CN')
const output = ref('')
const mode = ref('encode')

function convert() {
  output.value = ''
  if (!input.value) return
  try {
    output.value = mode.value === 'encode' ? encodeURIComponent(input.value) : decodeURIComponent(input.value)
  } catch (e) { output.value = '错误: ' + e.message }
}

function copyResult() { if (output.value) navigator.clipboard.writeText(output.value) }
</script>

<style scoped>

.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
.lang-select { width: 120px; }
</style>

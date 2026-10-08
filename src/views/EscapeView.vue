<template>
  <div class="tool-page">
    <ToolHeader />
    <div class="action-bar">
      <select v-model="mode" class="lang-select">
        <option value="escape">Escape</option>
        <option value="unescape">Unescape</option>
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

const input = ref('Hello World! 你好 © 2024')
const output = ref('')
const mode = ref('escape')

function convert() {
  output.value = ''
  if (!input.value) return
  try {
    output.value = mode.value === 'escape' ? escape(input.value) : unescape(input.value)
  } catch (e) { output.value = '错误: ' + e.message }
}

function copyResult() { if (output.value) navigator.clipboard.writeText(output.value) }
</script>

<style scoped>

.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
.lang-select { width: 140px; }
</style>

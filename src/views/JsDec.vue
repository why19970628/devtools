<template>
  <div class="tool-page">
    <ToolHeader />
    <div class="action-bar">
      <button class="btn btn-primary" @click="deobfuscate">反混淆</button>
      <button class="btn" @click="copyResult">复制结果</button>
    </div>
    <div class="io-panel">
      <div class="io-box">
        <div class="io-label"><span>输入混淆代码</span></div>
        <textarea v-model="input" class="io-textarea" placeholder="输入混淆的 JavaScript 代码..."></textarea>
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

function deobfuscate() {
  output.value = ''
  if (!input.value.trim()) return
  let code = input.value
  code = code.replace(/\\x([0-9A-Fa-f]{2})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
  code = code.replace(/\\u([0-9A-Fa-f]{4})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
  code = code.replace(/\\([0-7]{1,3})/g, (_, oct) => String.fromCharCode(parseInt(oct, 8)))
  output.value = code
}

function copyResult() { if (output.value) navigator.clipboard.writeText(output.value) }
</script>

<style scoped>

.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
</style>

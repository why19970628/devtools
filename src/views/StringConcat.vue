<template>
  <div class="tool-page">
    <ToolHeader />
    <div class="action-bar">
      <select v-model="format" class="lang-select">
        <option value="java">Java StringBuilder</option>
        <option value="sql">SQL IN</option>
        <option value="js">JS 数组</option>
        <option value="python">Python 列表</option>
      </select>
      <button class="btn btn-primary" @click="convert">转换</button>
      <button class="btn" @click="copyResult">复制结果</button>
    </div>
    <div class="io-panel">
      <div class="io-box">
        <div class="io-label"><span>输入（每行一个）</span></div>
        <textarea v-model="input" class="io-textarea" placeholder="每行一个字符串"></textarea>
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

const input = ref('apple\nbanana\ncherry')
const output = ref('')
const format = ref('java')

function convert() {
  output.value = ''
  const lines = input.value.split('\n').filter(l => l.trim())
  if (!lines.length) return
  switch (format.value) {
    case 'java':
      output.value = 'StringBuilder sb = new StringBuilder();\n' + lines.map(l => `sb.append("${l.trim()}");`).join('\n')
      break
    case 'sql':
      output.value = lines.map(l => `'${l.trim()}'`).join(', ')
      break
    case 'js':
      output.value = '[\n' + lines.map(l => `  "${l.trim()}"`).join(',\n') + '\n]'
      break
    case 'python':
      output.value = '[\n' + lines.map(l => `    "${l.trim()}"`).join(',\n') + '\n]'
      break
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

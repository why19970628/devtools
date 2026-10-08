<template>
  <div class="tool-page">
    <ToolHeader />
    <div class="action-bar">
      <select v-model="mode" class="lang-select">
        <option value="toJs">HTML → JS</option>
        <option value="fromJs">JS → HTML</option>
      </select>
      <select v-model="jsFormat" class="lang-select" v-if="mode === 'toJs'">
        <option value="concat">+ 拼接</option>
        <option value="push">Array.push</option>
        <option value="template">ES6 模板字符串</option>
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

const input = ref(`<div class="box">
  <p>Hello DevTools</p>
</div>`)
const output = ref('')
const mode = ref('toJs')
const jsFormat = ref('concat')

function convert() {
  output.value = ''
  if (!input.value.trim()) return
  if (mode.value === 'toJs') {
    const lines = input.value.split('\n')
    if (jsFormat.value === 'concat') {
      output.value = lines.map((l, i) => `var html${i ? i : ''} = "${l.replace(/"/g, '\\"')}"`).join('\n')
    } else if (jsFormat.value === 'push') {
      output.value = 'var html = [];\n' + lines.map(l => `html.push("${l.replace(/"/g, '\\"')}");`).join('\n')
    } else {
      output.value = 'const html = `\n' + input.value + '\n`'
    }
  } else {
    output.value = input.value.replace(/var\s+\w+\s*=\s*["'`]/g, '').replace(/["'`];?\s*$/gm, '').replace(/html\.push\(["'`](.*)["'`]\)/gm, '$1').replace(/\\"/g, '"').replace(/\\n/g, '\n')
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

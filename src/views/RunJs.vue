<template>
  <div class="tool-page">
    <div class="page-header">
      <h1>▶️ RunJs 在线运行 JS</h1>
      <p>在线运行 JavaScript 代码并查看 console 输出</p>
    </div>
    <div class="action-bar">
      <button class="btn btn-primary" @click="run">▶ 运行</button>
      <button class="btn" @click="clear">清空</button>
    </div>
    <div class="io-panel">
      <div class="io-box">
        <div class="io-label"><span>JavaScript 代码</span></div>
        <textarea v-model="code" class="io-textarea" placeholder="console.log('hello')"></textarea>
      </div>
      <div class="io-box">
        <div class="io-label"><span>控制台输出</span></div>
        <pre class="console-output">{{ output }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const code = ref('console.log("hello", 1 + 1)')
const output = ref('')

function run() {
  output.value = ''
  const logs = []
  const fakeConsole = {
    log: (...args) => logs.push(args.map(fmt).join(' ')),
    error: (...args) => logs.push('[error] ' + args.map(fmt).join(' ')),
    warn: (...args) => logs.push('[warn] ' + args.map(fmt).join(' ')),
    info: (...args) => logs.push(args.map(fmt).join(' ')),
  }
  try {
    // ponytail: new Function with fake console, no sandbox — 本地自用工具
    const fn = new Function('console', code.value)
    fn(fakeConsole)
  } catch (e) {
    logs.push('Error: ' + e.message)
  }
  output.value = logs.join('\n') || '(无输出)'
}

function fmt(v) {
  try { return typeof v === 'object' ? JSON.stringify(v) : String(v) } catch { return String(v) }
}

function clear() { code.value = ''; output.value = '' }
</script>

<style scoped>

.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
.console-output { background: var(--bg-tertiary); color: var(--success); padding: 14px; border-radius: var(--radius-sm); font-family: monospace; font-size: 12px; white-space: pre-wrap; min-height: 200px; max-height: 400px; overflow-y: auto; }
</style>

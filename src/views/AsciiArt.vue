<template>
  <div class="tool-page">
    <div class="page-header">
      <h1>🎨 字符线条艺术字 (ASCII Art)</h1>
      <p>将英文和数字转换为经典 ASCII 字符线条艺术字</p>
    </div>
    <div class="action-bar">
      <input v-model="text" type="text" placeholder="输入文本" class="text-input" @input="generate" />
      <button class="btn btn-primary" @click="generate">生成</button>
      <button class="btn" @click="copyResult">复制结果</button>
    </div>
    <div v-if="output" class="ascii-result">
      <pre>{{ output }}</pre>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const text = ref('Hello')
const output = ref('')

const ASCII_ART = {
  'A': ['  █  ', ' █ █ ', '█████', '█   █', '█   █'],
  'B': ['████ ', '█   █', '████ ', '█   █', '████ '],
  'C': [' ████', '█    ', '█    ', '█    ', ' ████'],
  'D': ['████ ', '█   █', '█   █', '█   █', '████ '],
  'E': ['█████', '█    ', '████ ', '█    ', '█████'],
  'F': ['█████', '█    ', '████ ', '█    ', '█    '],
  'G': [' ████', '█    ', '█  ██', '█   █', ' ████'],
  'H': ['█   █', '█   █', '█████', '█   █', '█   █'],
  'I': ['█████', '  █  ', '  █  ', '  █  ', '█████'],
  'J': ['█████', '   █ ', '   █ ', '█  █ ', ' ██  '],
  'K': ['█   █', '█  █ ', '███  ', '█  █ ', '█   █'],
  'L': ['█    ', '█    ', '█    ', '█    ', '█████'],
  'M': ['█   █', '██ ██', '█ █ █', '█   █', '█   █'],
  'N': ['█   █', '██  █', '█ █ █', '█  ██', '█   █'],
  'O': [' ███ ', '█   █', '█   █', '█   █', ' ███ '],
  'P': ['████ ', '█   █', '████ ', '█    ', '█    '],
  'Q': [' ███ ', '█   █', '█ █ █', '█  █ ', ' ██ █'],
  'R': ['████ ', '█   █', '████ ', '█  █ ', '█   █'],
  'S': [' ████', '█    ', ' ███ ', '    █', '████ '],
  'T': ['█████', '  █  ', '  █  ', '  █  ', '  █  '],
  'U': ['█   █', '█   █', '█   █', '█   █', ' ███ '],
  'V': ['█   █', '█   █', '█   █', ' █ █ ', '  █  '],
  'W': ['█   █', '█   █', '█ █ █', '██ ██', '█   █'],
  'X': ['█   █', ' █ █ ', '  █  ', ' █ █ ', '█   █'],
  'Y': ['█   █', ' █ █ ', '  █  ', '  █  ', '  █  '],
  'Z': ['█████', '   █ ', '  █  ', ' █   ', '█████'],
  '0': [' ███ ', '█  ██', '█ █ █', '██  █', ' ███ '],
  '1': ['  █  ', ' ██  ', '  █  ', '  █  ', '█████'],
  '2': [' ███ ', '█   █', '  ██ ', ' █   ', '█████'],
  '3': ['████ ', '    █', ' ███ ', '    █', '████ '],
  '4': ['█  █ ', '█  █ ', '█████', '   █ ', '   █ '],
  '5': ['█████', '█    ', '████ ', '    █', '████ '],
  '6': [' ███ ', '█    ', '████ ', '█   █', ' ███ '],
  '7': ['█████', '   █ ', '  █  ', ' █   ', '█    '],
  '8': [' ███ ', '█   █', ' ███ ', '█   █', ' ███ '],
  '9': [' ███ ', '█   █', ' ████', '    █', ' ███ '],
  ' ': ['   ', '   ', '   ', '   ', '   '],
}

function generate() {
  if (!text.value) { output.value = ''; return }
  const chars = [...text.value.toUpperCase()]
  const lines = ['', '', '', '', '']
  for (const ch of chars) {
    const art = ASCII_ART[ch] || ASCII_ART[' ']
    for (let i = 0; i < 5; i++) lines[i] += art[i] + ' '
  }
  output.value = lines.join('\n')
}

function copyResult() { if (output.value) navigator.clipboard.writeText(output.value) }
</script>

<style scoped>

.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
.text-input { width: 200px; }
.ascii-result { background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: var(--radius); padding: 16px; overflow-x: auto; }
.ascii-result pre { font-family: monospace; font-size: 12px; line-height: 1.2; color: var(--accent); }
</style>

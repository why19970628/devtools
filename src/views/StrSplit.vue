<template>
  <div class="tool-page">
    <ToolHeader />
    <div class="action-bar">
      <input v-model="delimiter" type="text" placeholder="分隔符" class="delimiter-input" />
      <button class="btn btn-primary" @click="split">分割</button>
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

const input = ref('name,age,city\nAlice,30,Beijing\nBob,25,Shanghai')
const output = ref('')
const delimiter = ref(',')

function split() {
  output.value = ''
  if (!input.value.trim()) return
  const lines = input.value.split('\n').filter(l => l.trim())
  output.value = lines.map(line => line.split(delimiter.value).map(s => s.trim()).join('\n')).join('\n---\n')
}

function copyResult() { if (output.value) navigator.clipboard.writeText(output.value) }
</script>

<style scoped>

.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
.delimiter-input { width: 100px; }
</style>

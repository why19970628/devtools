<template>
  <div class="tool-page">
    <div class="page-header">
      <h1>🧹 文本去重与多行排序</h1>
      <p>多行文本去重、排序与统计</p>
    </div>
    <div class="action-bar">
      <button class="btn" @click="deduplicate">去重</button>
      <button class="btn" @click="sortAsc">升序</button>
      <button class="btn" @click="sortDesc">降序</button>
      <button class="btn" @click="reverse">反转</button>
      <button class="btn" @click="clear">清空</button>
    </div>
    <div class="io-panel">
      <div class="io-box">
        <div class="io-label"><span>输入</span></div>
        <textarea v-model="input" class="io-textarea" placeholder="每行一个文本..."></textarea>
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

const input = ref('apple\nbanana\napple\ncherry\nbanana')
const output = ref('')

function deduplicate() {
  if (!input.value.trim()) { output.value = ''; return }
  const lines = input.value.split('\n')
  output.value = [...new Set(lines)].join('\n')
}

function sortAsc() {
  if (!input.value.trim()) { output.value = ''; return }
  const lines = input.value.split('\n')
  output.value = lines.sort().join('\n')
}

function sortDesc() {
  if (!input.value.trim()) { output.value = ''; return }
  const lines = input.value.split('\n')
  output.value = lines.sort().reverse().join('\n')
}

function reverse() {
  if (!input.value.trim()) { output.value = ''; return }
  const lines = input.value.split('\n')
  output.value = lines.reverse().join('\n')
}

function clear() {
  input.value = ''
  output.value = ''
}
</script>

<style scoped>

.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
</style>

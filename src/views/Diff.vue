<template>
  <div class="tool-page">
    <ToolHeader />
    <div class="io-panel">
      <div class="io-box">
        <div class="io-label"><span>文本 A</span></div>
        <textarea v-model="textA" class="io-textarea"></textarea>
      </div>
      <div class="io-box">
        <div class="io-label"><span>文本 B</span></div>
        <textarea v-model="textB" class="io-textarea"></textarea>
      </div>
    </div>
    <div class="action-bar">
      <button class="btn btn-primary" @click="compare">对比</button>
    </div>
    <div v-if="diffResult.length" class="diff-result">
      <div class="card">
        <div class="card-header"><span class="card-title">对比结果</span></div>
        <div class="diff-list">
          <div v-for="(line, idx) in diffResult" :key="idx" class="diff-line" :class="line.type">
            <span class="line-num">{{ line.num }}</span>
            <span class="line-content">{{ line.content }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const textA = ref(`const version = '1.0.0'
const name = 'devtools'
const debug = false`)
const textB = ref(`const version = '1.1.0'
const name = 'devtools'
const debug = true`)
const diffResult = ref([])

function compare() {
  diffResult.value = []
  const linesA = textA.value.split('\n')
  const linesB = textB.value.split('\n')
  const maxLen = Math.max(linesA.length, linesB.length)
  for (let i = 0; i < maxLen; i++) {
    const a = linesA[i] || ''
    const b = linesB[i] || ''
    if (a === b) {
      diffResult.value.push({ num: i + 1, content: a, type: 'same' })
    } else {
      if (a) diffResult.value.push({ num: i + 1, content: a, type: 'removed' })
      if (b) diffResult.value.push({ num: i + 1, content: b, type: 'added' })
    }
  }
}
</script>

<style scoped>

.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
.diff-result { margin-top: 16px; }
.diff-list { font-family: monospace; font-size: 13px; }
.diff-line { display: flex; padding: 2px 8px; }
.diff-line.same { background: transparent; }
.diff-line.added { background: rgba(63,185,80,0.15); }
.diff-line.removed { background: rgba(248,81,73,0.15); }
.line-num { min-width: 40px; color: var(--text-muted); text-align: right; padding-right: 12px; }
.line-content { white-space: pre-wrap; }
</style>

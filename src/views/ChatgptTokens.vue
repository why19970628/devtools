<template>
  <div class="tool-page">
    <ToolHeader />
    <div class="action-bar">
      <select v-model="model" class="lang-select">
        <option value="gpt-4">GPT-4</option>
        <option value="gpt-3.5">GPT-3.5</option>
        <option value="claude">Claude</option>
        <option value="llama">LLaMA</option>
      </select>
      <button class="btn btn-primary" @click="estimate">估算</button>
    </div>
    <div class="io-panel">
      <div class="io-box">
        <div class="io-label"><span>输入文本</span></div>
        <textarea v-model="input" class="io-textarea" placeholder="输入要估算的文本..."></textarea>
      </div>
      <div class="io-box">
        <div class="io-label"><span>估算结果</span></div>
        <div class="result-content">
          <div class="result-item"><span class="result-label">字符数</span><span class="value">{{ charCount }}</span></div>
          <div class="result-item"><span class="result-label">估算 Token</span><span class="value">{{ tokenCount }}</span></div>
          <div class="result-item"><span class="result-label">模型</span><span class="value">{{ model }}</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const input = ref('请用一句话解释什么是 Token，以及为什么大模型按 Token 计费。')
const model = ref('gpt-4')

const charCount = computed(() => input.value.length)
const tokenCount = computed(() => {
  if (!input.value) return 0
  const chineseChars = (input.value.match(/[\u4e00-\u9fff]/g) || []).length
  const otherChars = input.value.length - chineseChars
  return Math.ceil(chineseChars * 1.5 + otherChars / 4)
})

function estimate() {
  // computed properties auto-update
}
</script>

<style scoped>

.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
.lang-select { width: 140px; }
.result-content { display: flex; flex-direction: column; gap: 12px; }
.result-item { display: flex; justify-content: space-between; }
.result-label { font-size: 13px; color: var(--text-secondary); }
.value { font-family: monospace; font-size: 16px; font-weight: 600; }
</style>

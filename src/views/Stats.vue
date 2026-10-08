<template>
  <div class="tool-page">
    <div class="page-header">
      <h1>📊 文本深度统计与字数分析</h1>
      <p>字符数、单词数、行数、段落数等多维度统计</p>
    </div>
    <div class="io-panel">
      <div class="io-box">
        <div class="io-label"><span>输入文本</span></div>
        <textarea v-model="input" class="io-textarea" placeholder="输入要统计的文本..."></textarea>
      </div>
      <div class="io-box">
        <div class="io-label"><span>统计结果</span></div>
        <div class="stats-grid">
          <div class="stat-item"><span class="stat-label">总字符数</span><span class="value">{{ stats.totalChars }}</span></div>
          <div class="stat-item"><span class="stat-label">字符数 (不含空格)</span><span class="value">{{ stats.charsNoSpace }}</span></div>
          <div class="stat-item"><span class="stat-label">单词数</span><span class="value">{{ stats.words }}</span></div>
          <div class="stat-item"><span class="stat-label">中文字符</span><span class="value">{{ stats.chineseChars }}</span></div>
          <div class="stat-item"><span class="stat-label">英文单词</span><span class="value">{{ stats.englishWords }}</span></div>
          <div class="stat-item"><span class="stat-label">数字</span><span class="value">{{ stats.numbers }}</span></div>
          <div class="stat-item"><span class="stat-label">行数</span><span class="value">{{ stats.lines }}</span></div>
          <div class="stat-item"><span class="stat-label">段落数</span><span class="value">{{ stats.paragraphs }}</span></div>
          <div class="stat-item"><span class="stat-label">标点符号</span><span class="value">{{ stats.punctuation }}</span></div>
          <div class="stat-item"><span class="stat-label">空格数</span><span class="value">{{ stats.spaces }}</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const input = ref('Hello, 世界！这是一段用于统计的示例文本。\nIt contains English words, 数字 123, and punctuation.')

const stats = computed(() => {
  const text = input.value
  return {
    totalChars: text.length,
    charsNoSpace: text.replace(/\s/g, '').length,
    words: (text.match(/[a-zA-Z]+/g) || []).length,
    chineseChars: (text.match(/[\u4e00-\u9fff]/g) || []).length,
    englishWords: (text.match(/[a-zA-Z]+/g) || []).length,
    numbers: (text.match(/\d+/g) || []).length,
    lines: text ? text.split('\n').length : 0,
    paragraphs: text ? text.split(/\n\s*\n/).filter(p => p.trim()).length : 0,
    punctuation: (text.match(/[^\w\s]/g) || []).length,
    spaces: (text.match(/\s/g) || []).length,
  }
})
</script>

<style scoped>

.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
.stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.stat-item { display: flex; flex-direction: column; gap: 4px; padding: 8px 12px; background: var(--bg-tertiary); border-radius: var(--radius-sm); }
.stat-label { font-size: 12px; color: var(--text-secondary); }
.value { font-family: monospace; font-size: 18px; font-weight: 600; color: var(--accent); }
</style>

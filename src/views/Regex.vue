<template>
  <div class="tool-page">
    <div class="page-header">
      <h1>🔍 正则表达式测试</h1>
      <p>在线正则表达式匹配测试与分组提取</p>
    </div>
    <div class="regex-input">
      <input v-model="pattern" type="text" placeholder="正则表达式，如 \d+" class="regex-field" />
      <input v-model="flags" type="text" placeholder="标志，如 gi" class="flags-field" />
    </div>
    <div class="io-panel">
      <div class="io-box">
        <div class="io-label"><span>测试文本</span></div>
        <textarea v-model="testText" class="io-textarea" placeholder="输入要匹配的文本..."></textarea>
      </div>
      <div class="io-box">
        <div class="io-label"><span>匹配结果</span></div>
        <div v-if="matches.length" class="match-list">
          <div v-for="(match, idx) in matches" :key="idx" class="match-item">
            <span class="match-num">{{ idx + 1 }}</span>
            <span class="match-text">{{ match[0] }}</span>
            <span v-if="match.length > 1" class="match-groups">
              <span v-for="(group, gIdx) in match.slice(1)" :key="gIdx" class="group">{{ group }}</span>
            </span>
          </div>
        </div>
        <div v-else class="empty-state">无匹配结果</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const pattern = ref('\\d+')
const flags = ref('g')
const testText = ref('电话号码: 13812345678, 邮编: 100000')

const matches = computed(() => {
  if (!pattern.value || !testText.value) return []
  try {
    const regex = new RegExp(pattern.value, flags.value)
    const result = []
    let match
    while ((match = regex.exec(testText.value)) !== null) {
      result.push([...match])
      if (!flags.value.includes('g')) break
    }
    return result
  } catch (e) {
    return []
  }
})
</script>

<style scoped>

.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
.regex-input { display: flex; gap: 8px; margin-bottom: 16px; }
.regex-field { flex: 1; font-family: monospace; }
.flags-field { width: 80px; font-family: monospace; }
.match-list { display: flex; flex-direction: column; gap: 6px; }
.match-item { display: flex; align-items: center; gap: 8px; padding: 6px 10px; background: var(--bg-tertiary); border-radius: var(--radius-sm); }
.match-num { font-size: 11px; color: var(--text-muted); min-width: 20px; }
.match-text { font-family: monospace; color: var(--accent); }
.match-groups { display: flex; gap: 4px; }
.group { font-size: 11px; background: rgba(88,166,255,0.15); color: var(--accent); padding: 1px 6px; border-radius: 4px; }
.empty-state { color: var(--text-secondary); text-align: center; padding: 20px; }
</style>

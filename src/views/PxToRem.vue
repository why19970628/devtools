<template>
  <div class="tool-page">
    <div class="page-header">
      <h1>📏 PX 与 REM / EM 换算</h1>
      <p>输入 PX 实时计算 REM，支持整段 CSS 样式代码批量换算</p>
    </div>
    <div class="action-bar">
      <div class="config-item">
        <label>基准字体大小 (px)</label>
        <input v-model.number="baseSize" type="number" min="1" class="config-input" />
      </div>
      <button class="btn btn-primary" @click="convert">转换</button>
      <button class="btn" @click="copyResult">复制结果</button>
    </div>
    <div class="io-panel">
      <div class="io-box">
        <div class="io-label"><span>输入 CSS</span></div>
        <textarea v-model="input" class="io-textarea" placeholder="输入 CSS 代码，如：font-size: 16px;"></textarea>
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

const input = ref(`.container {
  font-size: 16px;
  padding: 20px 32px;
  margin: 8px;
}`)

function convert() {
  output.value = ''
  if (!input.value.trim()) return
  output.value = input.value.replace(/(\d+(?:\.\d+)?)px/g, (match, px) => {
    const rem = (parseFloat(px) / baseSize.value).toFixed(4).replace(/\.?0+$/, '')
    return `${rem}rem`
  })
}

function copyResult() { if (output.value) navigator.clipboard.writeText(output.value) }
</script>

<style scoped>

.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
.config-item { display: flex; align-items: center; gap: 8px; }
.config-item label { font-size: 13px; }
.config-input { width: 80px; }
</style>

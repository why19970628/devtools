<template>
  <div class="tool-page">
    <ToolHeader />
    <div class="config-grid">
      <div class="config-item">
        <label>字体族 (font-family)</label>
        <input v-model="family" type="text" placeholder="如 Source Han Sans SC" />
      </div>
      <div class="config-item">
        <label>字体地址 (woff2)</label>
        <input v-model="fontUrl" type="text" placeholder="https://example.com/font.woff2" />
      </div>
      <div class="config-item">
        <label>字号 (font-size)</label>
        <input v-model="size" type="number" />
      </div>
      <div class="config-item">
        <label>字重 (font-weight)</label>
        <select v-model="weight">
          <option v-for="w in [100,200,300,400,500,600,700,800,900]" :key="w" :value="w">{{ w }}</option>
        </select>
      </div>
      <div class="config-item">
        <label>字间距 (letter-spacing)</label>
        <input v-model="spacing" type="text" placeholder="如 1px / 0.05em" />
      </div>
      <div class="config-item">
        <label>行高 (line-height)</label>
        <input v-model="lineHeight" type="text" placeholder="如 1.5" />
      </div>
    </div>
    <div class="preview card">
      <div class="card-header"><span class="card-title">预览</span></div>
      <div :style="previewStyle" class="preview-text">永字八法 The quick brown fox 敏捷跨越 0123456789</div>
    </div>
    <div class="card" style="margin-top:12px">
      <div class="card-header"><span class="card-title">生成代码</span><button class="btn" @click="copy">复制</button></div>
      <pre class="code-block">{{ code }}</pre>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const family = ref('MyFont')
const fontUrl = ref('')
const size = ref(16)
const weight = ref(400)
const spacing = ref('')
const lineHeight = ref('1.5')

const previewStyle = computed(() => ({
  fontFamily: `'${family.value}', sans-serif`,
  fontSize: size.value + 'px',
  fontWeight: weight.value,
  letterSpacing: spacing.value,
  lineHeight: lineHeight.value,
}))

const code = computed(() => {
  let out = ''
  if (fontUrl.value) {
    out = `@font-face {\n  font-family: '${family.value}';\n  src: url('${fontUrl.value}') format('woff2');\n  font-weight: ${weight.value};\n  font-display: swap;\n}\n\n`
  }
  out += `.my-text {\n  font-family: '${family.value}', sans-serif;\n  font-size: ${size.value}px;\n  font-weight: ${weight.value};\n  letter-spacing: ${spacing.value || 'normal'};\n  line-height: ${lineHeight.value};\n}`
  return out
})

function copy() { navigator.clipboard.writeText(code.value) }
</script>

<style scoped>

.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
.config-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px; }
.config-item { display: flex; flex-direction: column; gap: 4px; }
.config-item label { font-size: 12px; color: var(--text-secondary); }
.preview-text { padding: 24px; background: var(--bg-tertiary); border-radius: var(--radius-sm); }
.code-block { background: var(--bg-tertiary); padding: 14px; border-radius: var(--radius); font-family: monospace; font-size: 12px; white-space: pre-wrap; }
</style>

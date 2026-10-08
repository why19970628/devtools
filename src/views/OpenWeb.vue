<template>
  <div class="tool-page">
    <ToolHeader />
    <div class="config-grid">
      <div class="config-item">
        <label>URL</label>
        <input v-model="url" type="text" placeholder="https://example.com" class="full-input" />
      </div>
      <div class="config-item">
        <label>宽度 (px)</label>
        <input v-model.number="width" type="number" min="100" class="config-input" />
      </div>
      <div class="config-item">
        <label>高度 (px)</label>
        <input v-model.number="height" type="number" min="100" class="config-input" />
      </div>
      <div class="config-item">
        <label>左边距 (px)</label>
        <input v-model.number="left" type="number" class="config-input" />
      </div>
      <div class="config-item">
        <label>上边距 (px)</label>
        <input v-model.number="top" type="number" class="config-input" />
      </div>
      <div class="config-item">
        <label><input type="checkbox" v-model="resizable" /> 可调整大小</label>
        <label><input type="checkbox" v-model="scrollbars" /> 滚动条</label>
        <label><input type="checkbox" v-model="menubar" /> 菜单栏</label>
        <label><input type="checkbox" v-model="toolbar" /> 工具栏</label>
      </div>
    </div>
    <div class="action-bar">
      <button class="btn btn-primary" @click="generate">生成代码</button>
      <button class="btn" @click="copyResult">复制代码</button>
      <button class="btn" @click="preview">预览</button>
    </div>
    <div v-if="output" class="result-section">
      <pre class="code-block">{{ output }}</pre>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const url = ref('https://example.com')
const width = ref(800)
const height = ref(600)
const left = ref(100)
const top = ref(100)
const resizable = ref(true)
const scrollbars = ref(true)
const menubar = ref(false)
const toolbar = ref(false)
const output = ref('')

function generate() {
  const features = [
    `width=${width.value}`,
    `height=${height.value}`,
    `left=${left.value}`,
    `top=${top.value}`,
    `resizable=${resizable.value ? 'yes' : 'no'}`,
    `scrollbars=${scrollbars.value ? 'yes' : 'no'}`,
    `menubar=${menubar.value ? 'yes' : 'no'}`,
    `toolbar=${toolbar.value ? 'yes' : 'no'}`,
  ].join(',')
  output.value = `window.open('${url.value}', '_blank', '${features}');`
}

function copyResult() { if (output.value) navigator.clipboard.writeText(output.value) }

function preview() {
  const features = `width=${width.value},height=${height.value},left=${left.value},top=${top.value}`
  window.open(url.value, '_blank', features)
}
</script>

<style scoped>

.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
.config-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px; }
.config-item { display: flex; flex-direction: column; gap: 4px; }
.config-item label { font-size: 12px; color: var(--text-secondary); }
.config-input { width: 100px; }
.full-input { width: 100%; }
.result-section { margin-top: 16px; }
.code-block { background: var(--bg-tertiary); padding: 14px; border-radius: var(--radius); font-family: monospace; font-size: 13px; white-space: pre-wrap; }
</style>

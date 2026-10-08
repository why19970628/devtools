<template>
  <div class="tool-page">
    <div class="page-header">
      <h1>📐 SVG 在线编辑与实时预览</h1>
      <p>SVG 矢量源码实时编辑排版、即时画布缩放预览</p>
    </div>
    <div class="io-panel">
      <div class="io-box">
        <div class="io-label"><span>SVG 源码</span></div>
        <textarea v-model="svgCode" class="io-textarea" placeholder="输入 SVG 代码..."></textarea>
      </div>
      <div class="io-box">
        <div class="io-label"><span>预览</span></div>
        <div class="svg-preview" v-html="svgCode"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const svgCode = ref('<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">\n  <circle cx="100" cy="100" r="80" fill="#58a6ff"/>\n  <text x="100" y="110" text-anchor="middle" fill="#fff" font-size="24">SVG</text>\n</svg>')
</script>

<style scoped>

.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
.svg-preview { background: var(--bg-tertiary); border: 1px solid var(--border-color); border-radius: var(--radius); padding: 20px; min-height: 200px; display: flex; align-items: center; justify-content: center; }
.svg-preview svg { max-width: 100%; max-height: 400px; }
</style>

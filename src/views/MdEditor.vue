<template>
  <div class="tool-page">
    <div class="page-header">
      <h1>📝 Markdown 分屏编辑器</h1>
      <p>Markdown 实时预览编辑</p>
    </div>
    <div class="md-editor">
      <textarea v-model="markdown" class="md-input" placeholder="输入 Markdown..."></textarea>
      <div class="md-preview" v-html="renderedHtml"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const markdown = ref(`# Markdown 示例

## 标题 2

这是 **粗体** 和 *斜体* 文字

- 项目 1
- 项目 2
- 项目 3

\`\`\`javascript
function hello() {
  console.log('Hello, World!');
}
\`\`\`

[链接示例](https://www.example.com)`)

const renderedHtml = computed(() => renderMarkdown(markdown.value))

function renderMarkdown(md) {
  let html = md
  html = html.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  html = html.replace(/^###### (.*)$/gm, '<h6>$1</h6>')
  html = html.replace(/^##### (.*)$/gm, '<h5>$1</h5>')
  html = html.replace(/^#### (.*)$/gm, '<h4>$1</h4>')
  html = html.replace(/^### (.*)$/gm, '<h3>$1</h3>')
  html = html.replace(/^## (.*)$/gm, '<h2>$1</h2>')
  html = html.replace(/^# (.*)$/gm, '<h1>$1</h1>')
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>')
  html = html.replace(/`(.*?)`/g, '<code>$1</code>')
  html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
  html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>')
  html = html.replace(/^- (.*)$/gm, '<li>$1</li>')
  html = html.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
  html = html.replace(/\n\n/g, '</p><p>')
  html = '<p>' + html + '</p>'
  return html
}
</script>

<style scoped>

.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
.md-editor { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; flex: 1; min-height: 480px; align-items: stretch; }
.md-input { width: 100%; height: 100%; resize: none; font-family: monospace; font-size: 13px; line-height: 1.6; }
.md-preview { background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: var(--radius); padding: 16px; overflow-y: auto; line-height: 1.6; }
.md-preview :deep(h1) { font-size: 24px; margin: 16px 0; }
.md-preview :deep(h2) { font-size: 20px; margin: 14px 0; }
.md-preview :deep(h3) { font-size: 18px; margin: 12px 0; }
.md-preview :deep(pre) { background: var(--bg-tertiary); padding: 12px; border-radius: var(--radius); overflow-x: auto; }
.md-preview :deep(code) { background: var(--bg-tertiary); padding: 2px 6px; border-radius: 4px; font-family: monospace; }
.md-preview :deep(li) { margin-left: 20px; }
</style>

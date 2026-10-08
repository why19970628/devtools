<template>
  <div class="tool-page">
    <div class="page-header">
      <h1>📋 HTTP Content-Type 对照表</h1>
      <p>常见 MIME 类型与 Content-Type 对照速查</p>
    </div>
    <div class="mime-list">
      <div v-for="mime in mimes" :key="mime.type" class="mime-item">
        <span class="mime-type">{{ mime.type }}</span>
        <span class="mime-ext">{{ mime.ext }}</span>
        <span class="mime-desc">{{ mime.desc }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const mimes = ref([
  { type: 'text/html', ext: '.html, .htm', desc: 'HTML 文档' },
  { type: 'text/plain', ext: '.txt', desc: '纯文本' },
  { type: 'text/css', ext: '.css', desc: 'CSS 样式表' },
  { type: 'text/javascript', ext: '.js', desc: 'JavaScript' },
  { type: 'application/json', ext: '.json', desc: 'JSON 数据' },
  { type: 'application/xml', ext: '.xml', desc: 'XML 数据' },
  { type: 'application/pdf', ext: '.pdf', desc: 'PDF 文档' },
  { type: 'application/zip', ext: '.zip', desc: 'ZIP 压缩包' },
  { type: 'application/gzip', ext: '.gz', desc: 'GZIP 压缩包' },
  { type: 'application/octet-stream', ext: '.bin', desc: '二进制流' },
  { type: 'image/jpeg', ext: '.jpg, .jpeg', desc: 'JPEG 图片' },
  { type: 'image/png', ext: '.png', desc: 'PNG 图片' },
  { type: 'image/gif', ext: '.gif', desc: 'GIF 图片' },
  { type: 'image/webp', ext: '.webp', desc: 'WebP 图片' },
  { type: 'image/svg+xml', ext: '.svg', desc: 'SVG 矢量图' },
  { type: 'image/x-icon', ext: '.ico', desc: '图标文件' },
  { type: 'audio/mpeg', ext: '.mp3', desc: 'MP3 音频' },
  { type: 'audio/wav', ext: '.wav', desc: 'WAV 音频' },
  { type: 'video/mp4', ext: '.mp4', desc: 'MP4 视频' },
  { type: 'video/mpeg', ext: '.mpeg', desc: 'MPEG 视频' },
  { type: 'video/webm', ext: '.webm', desc: 'WebM 视频' },
  { type: 'multipart/form-data', ext: '-', desc: '表单文件上传' },
  { type: 'application/x-www-form-urlencoded', ext: '-', desc: '表单 URL 编码' },
  { type: 'application/javascript', ext: '.js', desc: 'JavaScript (旧)' },
  { type: 'application/x-javascript', ext: '.js', desc: 'JavaScript (旧)' },
  { type: 'text/xml', ext: '.xml', desc: 'XML (旧)' },
  { type: 'application/xhtml+xml', ext: '.xhtml', desc: 'XHTML' },
  { type: 'application/rss+xml', ext: '.rss', desc: 'RSS 订阅' },
  { type: 'application/atom+xml', ext: '.atom', desc: 'Atom 订阅' },
  { type: 'text/csv', ext: '.csv', desc: 'CSV 文件' },
  { type: 'application/vnd.ms-excel', ext: '.xls', desc: 'Excel 97-2003' },
  { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', ext: '.xlsx', desc: 'Excel 2007+' },
  { type: 'application/vnd.ms-powerpoint', ext: '.ppt', desc: 'PowerPoint 97-2003' },
  { type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation', ext: '.pptx', desc: 'PowerPoint 2007+' },
  { type: 'application/msword', ext: '.doc', desc: 'Word 97-2003' },
  { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', ext: '.docx', desc: 'Word 2007+' },
])
</script>

<style scoped>

.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
.mime-list { display: flex; flex-direction: column; gap: 4px; }
.mime-item { display: flex; align-items: center; gap: 16px; padding: 8px 14px; background: var(--bg-secondary); border-radius: var(--radius-sm); }
.mime-type { font-family: monospace; font-weight: 600; min-width: 350px; color: var(--accent); }
.mime-ext { font-family: monospace; min-width: 120px; color: var(--text-secondary); }
.mime-desc { color: var(--text-secondary); font-size: 13px; }
</style>

<template>
  <div class="tool-page">
    <div class="page-header">
      <h1>🌐 常用 User-Agent 库与解析</h1>
      <p>当前浏览器 UA 检测，及 iOS/Android/微信/爬虫蜘蛛高频 UA 速查</p>
    </div>
    <div class="current-ua">
      <div class="card">
        <div class="card-header"><span class="card-title">当前浏览器 UA</span></div>
        <pre class="code-block">{{ userAgent }}</pre>
      </div>
    </div>
    <div class="ua-list">
      <div class="card">
        <div class="card-header"><span class="card-title">常用 UA 速查</span></div>
        <div class="ua-grid">
          <div v-for="ua in commonUAs" :key="ua.name" class="ua-item">
            <span class="ua-name">{{ ua.name }}</span>
            <span class="ua-value">{{ ua.value }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const userAgent = ref(navigator.userAgent)

const commonUAs = [
  { name: 'Chrome (Windows)', value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' },
  { name: 'Chrome (macOS)', value: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' },
  { name: 'Firefox (Windows)', value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0' },
  { name: 'Safari (macOS)', value: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Safari/605.1.15' },
  { name: 'Edge (Windows)', value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0' },
  { name: 'iPhone Safari', value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Mobile/15E148 Safari/604.1' },
  { name: 'Android Chrome', value: 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36' },
  { name: '微信内置浏览器', value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.43(0x18002b2d) NetType/WIFI Language/zh_CN' },
  { name: '百度蜘蛛', value: 'Mozilla/5.0 (compatible; Baiduspider/2.0; +http://www.baidu.com/search/spider.html)' },
  { name: 'Googlebot', value: 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)' },
]
</script>

<style scoped>

.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
.current-ua { margin-bottom: 16px; }
.code-block { background: var(--bg-tertiary); padding: 14px; border-radius: var(--radius); font-family: monospace; font-size: 12px; white-space: pre-wrap; word-break: break-all; }
.ua-list { margin-top: 16px; }
.ua-grid { display: flex; flex-direction: column; gap: 8px; }
.ua-item { display: flex; flex-direction: column; gap: 4px; padding: 8px 12px; background: var(--bg-tertiary); border-radius: var(--radius-sm); }
.ua-name { font-weight: 600; font-size: 13px; }
.ua-value { font-family: monospace; font-size: 11px; color: var(--text-secondary); word-break: break-all; }
</style>

<template>
  <div class="tool-page">
    <ToolHeader />
    <div class="regex-list">
      <div v-for="item in regexList" :key="item.name" class="regex-item">
        <div class="regex-header">
          <span class="regex-name">{{ item.name }}</span>
          <span class="regex-pattern">{{ item.pattern }}</span>
        </div>
        <div class="regex-desc">{{ item.desc }}</div>
        <div class="regex-code">
          <pre>{{ generateCode(item.pattern) }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const regexList = ref([
  { name: '手机号', pattern: '/^1[3-9]\\d{9}$/', desc: '中国大陆手机号' },
  { name: '邮箱', pattern: '/^[\\w.-]+@[\\w.-]+\\.[a-zA-Z]{2,}$/', desc: '电子邮箱地址' },
  { name: '身份证', pattern: '/^\\d{17}[\\dXx]$/', desc: '18 位身份证号' },
  { name: 'URL', pattern: '/^https?:\\/\\/[\\w.-]+\\.[a-zA-Z]{2,}/', desc: '网址' },
  { name: 'IPv4', pattern: '/^(\\d{1,3}\\.){3}\\d{1,3}$/', desc: 'IPv4 地址' },
  { name: '日期 (YYYY-MM-DD)', pattern: '/^\\d{4}-\\d{2}-\\d{2}$/', desc: '日期格式' },
  { name: '时间 (HH:MM:SS)', pattern: '/^\\d{2}:\\d{2}:\\d{2}$/', desc: '时间格式' },
  { name: '中文', pattern: '/^[\\u4e00-\\u9fff]+$/', desc: '纯中文字符' },
  { name: '数字', pattern: '/^\\d+$/', desc: '纯数字' },
  { name: '字母数字', pattern: '/^[a-zA-Z0-9]+$/', desc: '字母和数字组合' },
  { name: '密码强度', pattern: '/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$/', desc: '至少 8 位，包含大小写字母和数字' },
  { name: 'QQ 号', pattern: '/^[1-9]\\d{4,10}$/', desc: 'QQ 号码' },
  { name: '邮政编码', pattern: '/^[1-9]\\d{5}$/', desc: '中国邮政编码' },
  { name: '银行卡', pattern: '/^\\d{16,19}$/', desc: '银行卡号' },
])

function generateCode(pattern) {
  return `const regex = ${pattern}\nconst isValid = regex.test(input)`
}
</script>

<style scoped>

.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
.regex-list { display: flex; flex-direction: column; gap: 12px; }
.regex-item { background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: var(--radius); padding: 12px; }
.regex-header { display: flex; align-items: center; gap: 12px; margin-bottom: 4px; }
.regex-name { font-weight: 600; }
.regex-pattern { font-family: monospace; color: var(--accent); }
.regex-desc { font-size: 12px; color: var(--text-secondary); margin-bottom: 8px; }
.regex-code pre { background: var(--bg-tertiary); padding: 10px; border-radius: var(--radius-sm); font-family: monospace; font-size: 12px; overflow-x: auto; }
</style>

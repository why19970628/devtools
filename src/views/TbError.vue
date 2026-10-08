<template>
  <div class="tool-page">
    <div class="page-header">
      <h1>🧾 淘宝错误码查询工具</h1>
      <p>淘宝开放平台 API 常见错误码与说明</p>
    </div>
    <div class="action-bar">
      <input v-model="keyword" type="text" placeholder="搜索错误码或关键字，如 isv" class="search-input" />
    </div>
    <div class="error-list">
      <div v-for="item in filtered" :key="item.code" class="error-item">
        <div class="error-header">
          <span class="error-code">{{ item.code }}</span>
          <span class="error-msg">{{ item.msg }}</span>
        </div>
        <div class="error-fix">{{ item.fix }}</div>
      </div>
      <div v-if="!filtered.length" class="empty-state">无匹配结果</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const keyword = ref('')

const errors = ref([
  { code: 'isv.invalid-parameter', msg: '无效的请求参数', fix: '检查参数名、类型、必填项是否符合 API 文档。' },
  { code: 'isv.invalid-sign', msg: '签名验证失败', fix: '检查 secret 排序拼接逻辑、URL 编码与字符集（UTF-8）。' },
  { code: 'isv.permission-denied', msg: '无权限调用该接口', fix: '确认应用已获授权并签约对应 API 包。' },
  { code: 'isv.invalid-app-key', msg: 'app_key 无效', fix: '确认 app_key 属于当前应用且未被禁用。' },
  { code: 'isv.invalid-session', msg: 'session 无效或过期', fix: '重新走 OAuth 授权获取新的 sessionkey/token。' },
  { code: 'isv.exceeded-api-rate-limit', msg: 'API 调用超频', fix: '对调用做限流与退避重试。' },
  { code: 'isv.system-error', msg: '系统繁忙', fix: '稍后重试，持续出现联系淘宝开放平台支持。' },
  { code: 'isv.missing-method', msg: '缺少 method 参数', fix: '请求需携带 method=taobao.xxx.yyy。' },
  { code: 'isv.invalid-format', msg: '响应格式无效', fix: '检查 format 参数（xml/json）。' },
  { code: 'isv.invalid-charset', msg: '字符集不支持', fix: '使用 utf-8 字符集。' },
  { code: 'isv.invalid-timestamp', msg: '时间戳无效', fix: 'timestamp 需为 yyyy-MM-dd HH:mm:ss 格式且与服务器时间接近。' },
  { code: 'isv.invalid-version', msg: '接口版本无效', fix: '检查 version 参数（如 2.0）。' },
  { code: 'isv.forbbiden', msg: '禁止访问', fix: '应用被限制，检查应用状态与违规记录。' },
  { code: 'isv.item-not-exists', msg: '商品不存在', fix: '确认 num_iid 正确且商品未删除。' },
])

const filtered = computed(() => {
  if (!keyword.value.trim()) return errors.value
  const kw = keyword.value.toLowerCase()
  return errors.value.filter(e => (e.code + e.msg + e.fix).toLowerCase().includes(kw))
})
</script>

<style scoped>

.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
.search-input { width: 300px; }
.error-list { display: flex; flex-direction: column; gap: 8px; }
.error-item { padding: 12px 16px; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: var(--radius); }
.error-header { display: flex; align-items: center; gap: 12px; margin-bottom: 4px; }
.error-code { font-family: monospace; font-weight: 600; color: var(--accent); }
.error-msg { font-weight: 500; }
.error-fix { font-size: 13px; color: var(--text-secondary); }
.empty-state { color: var(--text-secondary); text-align: center; padding: 20px; }
</style>

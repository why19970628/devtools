<template>
  <div class="tool-page">
    <ToolHeader />
    <div class="status-list">
      <div v-for="status in statuses" :key="status.code" class="status-item" :class="status.category">
        <span class="status-code">{{ status.code }}</span>
        <span class="status-name">{{ status.name }}</span>
        <span class="status-desc">{{ status.desc }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const statuses = ref([
  { code: 100, name: 'Continue', desc: '继续。客户端应继续其请求', category: '1xx' },
  { code: 101, name: 'Switching Protocols', desc: '切换协议。服务器根据客户端请求切换协议', category: '1xx' },
  { code: 200, name: 'OK', desc: '请求成功', category: '2xx' },
  { code: 201, name: 'Created', desc: '已创建。请求成功并创建了新的资源', category: '2xx' },
  { code: 202, name: 'Accepted', desc: '已接受。请求已接受但尚未处理完成', category: '2xx' },
  { code: 204, name: 'No Content', desc: '无内容。服务器成功处理但未返回内容', category: '2xx' },
  { code: 206, name: 'Partial Content', desc: '部分内容。服务器成功处理了部分 GET 请求', category: '2xx' },
  { code: 301, name: 'Moved Permanently', desc: '永久重定向。资源已永久移动到新位置', category: '3xx' },
  { code: 302, name: 'Found', desc: '临时重定向。资源临时位于不同 URI', category: '3xx' },
  { code: 304, name: 'Not Modified', desc: '未修改。客户端缓存的版本仍然有效', category: '3xx' },
  { code: 307, name: 'Temporary Redirect', desc: '临时重定向。与 302 类似但要求保持请求方法', category: '3xx' },
  { code: 308, name: 'Permanent Redirect', desc: '永久重定向。与 301 类似但要求保持请求方法', category: '3xx' },
  { code: 400, name: 'Bad Request', desc: '错误请求。服务器无法理解请求的语法', category: '4xx' },
  { code: 401, name: 'Unauthorized', desc: '未授权。请求需要用户身份验证', category: '4xx' },
  { code: 403, name: 'Forbidden', desc: '禁止访问。服务器拒绝执行请求', category: '4xx' },
  { code: 404, name: 'Not Found', desc: '未找到。请求的资源不存在', category: '4xx' },
  { code: 405, name: 'Method Not Allowed', desc: '方法禁用。请求方法不被允许', category: '4xx' },
  { code: 408, name: 'Request Timeout', desc: '请求超时。服务器等待请求时超时', category: '4xx' },
  { code: 409, name: 'Conflict', desc: '冲突。请求与服务器当前状态冲突', category: '4xx' },
  { code: 410, name: 'Gone', desc: '已删除。请求的资源已永久删除', category: '4xx' },
  { code: 413, name: 'Payload Too Large', desc: '请求实体过大。请求体超过服务器限制', category: '4xx' },
  { code: 414, name: 'URI Too Long', desc: 'URI 过长。请求的 URI 超过服务器限制', category: '4xx' },
  { code: 415, name: 'Unsupported Media Type', desc: '不支持的媒体类型。请求的格式不被支持', category: '4xx' },
  { code: 429, name: 'Too Many Requests', desc: '请求过多。客户端发送了太多请求', category: '4xx' },
  { code: 500, name: 'Internal Server Error', desc: '服务器内部错误。服务器遇到意外情况', category: '5xx' },
  { code: 501, name: 'Not Implemented', desc: '尚未实现。服务器不具备完成请求的功能', category: '5xx' },
  { code: 502, name: 'Bad Gateway', desc: '错误网关。网关或代理收到无效响应', category: '5xx' },
  { code: 503, name: 'Service Unavailable', desc: '服务不可用。服务器暂时过载或维护', category: '5xx' },
  { code: 504, name: 'Gateway Timeout', desc: '网关超时。网关或代理未及时收到响应', category: '5xx' },
  { code: 505, name: 'HTTP Version Not Supported', desc: '不支持的 HTTP 版本。服务器不支持请求中的 HTTP 版本', category: '5xx' },
])
</script>

<style scoped>

.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
.status-list { display: flex; flex-direction: column; gap: 6px; }
.status-item { display: flex; align-items: center; gap: 12px; padding: 10px 14px; background: var(--bg-secondary); border-radius: var(--radius-sm); border-left: 3px solid; }
.status-item.1xx { border-left-color: #8b949e; }
.status-item.2xx { border-left-color: var(--success); }
.status-item.3xx { border-left-color: var(--accent); }
.status-item.4xx { border-left-color: var(--warning); }
.status-item.5xx { border-left-color: var(--danger); }
.status-code { font-family: monospace; font-weight: 700; font-size: 16px; min-width: 50px; }
.status-name { font-weight: 600; min-width: 200px; }
.status-desc { color: var(--text-secondary); font-size: 13px; }
</style>

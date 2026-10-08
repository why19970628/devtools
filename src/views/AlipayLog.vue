<template>
  <div class="tool-page">
    <ToolHeader />
    <div class="io-panel">
      <div class="io-box">
        <div class="io-label"><span>粘贴日志</span></div>
        <textarea v-model="log" class="io-textarea" placeholder="粘贴支付宝日志内容..."></textarea>
      </div>
      <div class="io-box">
        <div class="io-label"><span>解析结果</span></div>
        <div v-if="parsedEntries.length" class="log-list">
          <div v-for="(e, i) in parsedEntries" :key="i" class="log-item">
            <span :class="['badge', e.type === 'error' ? 'badge-danger' : 'badge-success']">{{ e.type }}</span>
            <span class="log-msg">{{ e.msg }}</span>
          </div>
        </div>
        <div v-else class="empty-state">粘贴日志后自动解析</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const log = ref(`[2024-05-20 10:23:45] INFO  alipay.sdk begin, method=alipay.trade.pay
[2024-05-20 10:23:46] INFO  alipay.sdk end, cost=312ms
[2024-05-20 10:24:01] ERROR alipay.trade.pay failed: isv.trade-not-exist
[2024-05-20 10:24:02] INFO  notify received: trade_status=TRADE_SUCCESS`)

const parsedEntries = computed(() => {
  if (!log.value.trim()) return []
  return log.value.split('\n').filter(l => l.trim()).map(line => {
    const isError = /error|exception|fail|错误|失败/i.test(line)
    return { type: isError ? 'error' : 'info', msg: line.trim() }
  })
})
</script>

<style scoped>

.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
.log-list { display: flex; flex-direction: column; gap: 6px; max-height: 400px; overflow-y: auto; }
.log-item { display: flex; align-items: center; gap: 8px; padding: 6px 10px; background: var(--bg-tertiary); border-radius: var(--radius-sm); }
.log-msg { font-family: monospace; font-size: 12px; word-break: break-all; }
.empty-state { color: var(--text-secondary); text-align: center; padding: 20px; }
</style>

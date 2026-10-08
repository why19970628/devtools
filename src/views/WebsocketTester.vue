<template>
  <div class="tool-page">
    <div class="page-header">
      <h1>🔌 WebSocket 在线测试</h1>
      <p>在线测试 ws:// 或 wss:// 连接、发送消息与历史收发流</p>
    </div>
    <div class="action-bar">
      <input v-model="url" type="text" placeholder="ws://echo.websocket.org" class="url-input" />
      <button class="btn btn-primary" @click="connect" v-if="!connected">连接</button>
      <button class="btn btn-danger" @click="disconnect" v-else>断开</button>
      <span :class="['badge', connected ? 'badge-success' : 'badge-danger']">{{ connected ? '已连接' : '未连接' }}</span>
    </div>
    <div class="io-panel">
      <div class="io-box">
        <div class="io-label"><span>消息记录</span></div>
        <div class="message-list" ref="messageList">
          <div v-for="(msg, idx) in messages" :key="idx" class="message-item" :class="msg.type">
            <span class="message-time">{{ msg.time }}</span>
            <span class="message-content">{{ msg.text }}</span>
          </div>
        </div>
      </div>
      <div class="io-box">
        <div class="io-label"><span>发送消息</span></div>
        <textarea v-model="inputMessage" class="io-textarea" placeholder="输入要发送的消息..."></textarea>
        <button class="btn btn-primary" @click="send" :disabled="!connected">发送</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'

const url = ref('wss://echo.websocket.org')
const connected = ref(false)
const messages = ref([])
const inputMessage = ref('{"type":"ping","ts":1728000000000}')
const messageList = ref(null)
let ws = null

function connect() {
  if (!url.value) return
  try {
    ws = new WebSocket(url.value)
    ws.onopen = () => {
      connected.value = true
      addMessage('system', '连接成功')
    }
    ws.onmessage = (e) => {
      addMessage('received', e.data)
    }
    ws.onclose = () => {
      connected.value = false
      addMessage('system', '连接已关闭')
    }
    ws.onerror = () => {
      addMessage('system', '连接错误')
    }
  } catch (e) {
    addMessage('system', '连接失败: ' + e.message)
  }
}

function disconnect() {
  if (ws) ws.close()
  connected.value = false
}

function send() {
  if (!ws || !inputMessage.value) return
  ws.send(inputMessage.value)
  addMessage('sent', inputMessage.value)
  inputMessage.value = ''
}

function addMessage(type, text) {
  messages.value.push({ type, text, time: new Date().toLocaleTimeString() })
  nextTick(() => {
    if (messageList.value) messageList.value.scrollTop = messageList.value.scrollHeight
  })
}
</script>

<style scoped>

.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
.url-input { flex: 1; }
.message-list { background: var(--bg-tertiary); border: 1px solid var(--border-color); border-radius: var(--radius); padding: 12px; min-height: 300px; max-height: 400px; overflow-y: auto; }
.message-item { display: flex; gap: 8px; padding: 4px 0; font-size: 13px; }
.message-item.sent .message-content { color: var(--accent); }
.message-item.received .message-content { color: var(--success); }
.message-item.system .message-content { color: var(--warning); }
.message-time { color: var(--text-muted); font-size: 11px; flex-shrink: 0; }
</style>

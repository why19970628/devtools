<template>
  <div class="tool-page">
    <div class="page-header">
      <h1>🎭 敏感数据脱敏工具</h1>
      <p>手机号、身份证号、姓名、邮箱、银行卡一键掩码脱敏</p>
    </div>
    <div class="action-bar">
      <select v-model="type" class="lang-select">
        <option value="phone">手机号</option>
        <option value="idcard">身份证号</option>
        <option value="name">姓名</option>
        <option value="email">邮箱</option>
        <option value="bankcard">银行卡</option>
      </select>
      <button class="btn btn-primary" @click="mask">脱敏</button>
      <button class="btn" @click="copyResult">复制结果</button>
    </div>
    <div class="io-panel">
      <div class="io-box">
        <div class="io-label"><span>输入</span></div>
        <textarea v-model="input" class="io-textarea" placeholder="输入敏感数据，每行一个"></textarea>
      </div>
      <div class="io-box">
        <div class="io-label"><span>脱敏结果</span></div>
        <textarea v-model="output" class="io-textarea" readonly></textarea>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const input = ref('13812345678\n13998765432')
const output = ref('')
const type = ref('phone')

function mask() {
  output.value = ''
  if (!input.value.trim()) return
  const lines = input.value.split('\n').filter(l => l.trim())
  output.value = lines.map(line => {
    const val = line.trim()
    switch (type.value) {
      case 'phone': return val.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
      case 'idcard': return val.replace(/(\d{6})\d{8}(\d{4})/, '$1********$2')
      case 'name': return val.length <= 1 ? val : val[0] + '*'.repeat(val.length - 1)
      case 'email': return val.replace(/(.{2}).+(@.+)/, '$1***$2')
      case 'bankcard': return val.replace(/(\d{4})\d+(\d{4})/, '$1 **** **** $2')
      default: return val
    }
  }).join('\n')
}

function copyResult() { if (output.value) navigator.clipboard.writeText(output.value) }
</script>

<style scoped>

.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
.lang-select { width: 140px; }
</style>

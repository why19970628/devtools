<template>
  <div class="tool-page">
    <div class="page-header">
      <h1>🛡️ 强密码随机生成器</h1>
      <p>高强度随机安全密码批量生成</p>
    </div>
    <div class="password-config">
      <div class="config-row">
        <label>长度</label>
        <input type="number" v-model.number="length" min="4" max="64" class="config-input" />
      </div>
      <div class="config-row">
        <label>数量</label>
        <input type="number" v-model.number="count" min="1" max="50" class="config-input" />
      </div>
      <div class="config-row">
        <label><input type="checkbox" v-model="useUpper" /> 大写字母</label>
        <label><input type="checkbox" v-model="useLower" /> 小写字母</label>
        <label><input type="checkbox" v-model="useDigits" /> 数字</label>
        <label><input type="checkbox" v-model="useSymbols" /> 特殊符号</label>
      </div>
      <button class="btn btn-primary" @click="generate">生成密码</button>
      <button class="btn" @click="copyAll" :disabled="!passwords.length">复制全部</button>
    </div>
    <div v-if="passwords.length" class="password-list">
      <div v-for="(pwd, idx) in passwords" :key="idx" class="password-item">
        <code>{{ pwd }}</code>
        <button class="btn btn-sm" @click="copyOne(pwd)">复制</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const length = ref(16)
const count = ref(10)
const useUpper = ref(true)
const useLower = ref(true)
const useDigits = ref(true)
const useSymbols = ref(true)
const passwords = ref([])

function generate() {
  let chars = ''
  if (useUpper.value) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  if (useLower.value) chars += 'abcdefghijklmnopqrstuvwxyz'
  if (useDigits.value) chars += '0123456789'
  if (useSymbols.value) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?'
  if (!chars) { passwords.value = []; return }
  passwords.value = Array.from({ length: count.value }, () =>
    Array.from({ length: length.value }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
  )
}

function copyOne(pwd) { navigator.clipboard.writeText(pwd) }
function copyAll() { navigator.clipboard.writeText(passwords.value.join('\n')) }
</script>

<style scoped>

.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
.password-config { background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: var(--radius); padding: 16px; margin-bottom: 16px; }
.config-row { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; flex-wrap: wrap; }
.config-row label { display: flex; align-items: center; gap: 4px; font-size: 13px; }
.config-input { width: 80px; }
.password-list { display: flex; flex-direction: column; gap: 6px; }
.password-item { display: flex; align-items: center; justify-content: space-between; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: var(--radius-sm); padding: 8px 12px; }
.password-item code { font-family: monospace; font-size: 14px; color: var(--accent); }
</style>

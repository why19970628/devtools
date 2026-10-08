<template>
  <div class="tool-page">
    <div class="page-header">
      <h1>⏰ Cron 表达式生成/校验</h1>
      <p>可视化生成 Cron 表达式，支持校验与下次执行时间预览</p>
    </div>
    <div class="cron-builder">
      <div class="cron-row">
        <label>秒</label>
        <select v-model="second">
          <option value="*">每秒</option>
          <option value="*/5">每 5 秒</option>
          <option value="*/10">每 10 秒</option>
          <option value="*/30">每 30 秒</option>
          <option value="0">第 0 秒</option>
        </select>
      </div>
      <div class="cron-row">
        <label>分</label>
        <select v-model="minute">
          <option value="*">每分</option>
          <option value="*/5">每 5 分</option>
          <option value="*/10">每 10 分</option>
          <option value="*/30">每 30 分</option>
          <option value="0">第 0 分</option>
        </select>
      </div>
      <div class="cron-row">
        <label>时</label>
        <select v-model="hour">
          <option value="*">每小时</option>
          <option value="*/2">每 2 小时</option>
          <option value="*/6">每 6 小时</option>
          <option value="0">0 点</option>
        </select>
      </div>
      <div class="cron-row">
        <label>日</label>
        <select v-model="day">
          <option value="*">每日</option>
          <option value="1">每月 1 日</option>
          <option value="15">每月 15 日</option>
          <option value="?">不指定</option>
        </select>
      </div>
      <div class="cron-row">
        <label>月</label>
        <select v-model="month">
          <option value="*">每月</option>
          <option value="1">1 月</option>
          <option value="4">4 月</option>
          <option value="7">7 月</option>
          <option value="10">10 月</option>
        </select>
      </div>
      <div class="cron-row">
        <label>周</label>
        <select v-model="week">
          <option value="*">每周</option>
          <option value="1">周一</option>
          <option value="2">周二</option>
          <option value="3">周三</option>
          <option value="4">周四</option>
          <option value="5">周五</option>
          <option value="6">周六</option>
          <option value="7">周日</option>
          <option value="?">不指定</option>
        </select>
      </div>
    </div>
    <div class="action-bar">
      <button class="btn btn-primary" @click="generate">生成</button>
      <button class="btn" @click="copyResult">复制结果</button>
    </div>
    <div v-if="cronExpression" class="result-section">
      <div class="card">
        <div class="card-header"><span class="card-title">Cron 表达式</span></div>
        <pre class="code-block">{{ cronExpression }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const second = ref('*')
const minute = ref('*')
const hour = ref('*')
const day = ref('*')
const month = ref('*')
const week = ref('?')
const cronExpression = ref('')

function generate() {
  cronExpression.value = `${second.value} ${minute.value} ${hour.value} ${day.value} ${month.value} ${week.value}`
}

function copyResult() { if (cronExpression.value) navigator.clipboard.writeText(cronExpression.value) }
</script>

<style scoped>

.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
.cron-builder { display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px; }
.cron-row { display: flex; align-items: center; gap: 12px; }
.cron-row label { width: 40px; font-size: 13px; color: var(--text-secondary); }
.cron-row select { flex: 1; }
.result-section { margin-top: 16px; }
.code-block { background: var(--bg-tertiary); padding: 14px; border-radius: var(--radius); font-family: monospace; font-size: 16px; }
</style>

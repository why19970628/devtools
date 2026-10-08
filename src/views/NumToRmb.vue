<template>
  <div class="tool-page">
    <ToolHeader />
    <div class="action-bar">
      <input v-model="amount" type="text" placeholder="输入金额，如 12345.67" class="amount-input" @input="convert" />
      <button class="btn btn-primary" @click="convert">转换</button>
      <button class="btn" @click="copyResult">复制结果</button>
    </div>
    <div v-if="result" class="result-section">
      <div class="card">
        <div class="card-header"><span class="card-title">大写金额</span></div>
        <div class="result-text">{{ result }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const amount = ref('')
const result = ref('')

function convert() {
  result.value = ''
  if (!amount.value.trim()) return
  const num = parseFloat(amount.value)
  if (isNaN(num)) { result.value = '请输入有效数字'; return }
  if (num > 999999999999.99) { result.value = '金额过大'; return }
  result.value = numberToRmb(num)
}

function numberToRmb(num) {
  const digits = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
  const units = ['', '拾', '佰', '仟']
  const bigUnits = ['', '万', '亿']
  const decUnits = ['角', '分']

  let [intPart, decPart] = num.toFixed(2).split('.')
  let result = ''

  if (intPart === '0') {
    result = '零'
  } else {
    let zeroCount = 0
    const len = intPart.length
    for (let i = 0; i < len; i++) {
      const digit = parseInt(intPart[i])
      const pos = len - i - 1
      const unitPos = pos % 4
      const bigUnitPos = Math.floor(pos / 4)

      if (digit === 0) {
        zeroCount++
        if (unitPos === 0 && zeroCount < 4) {
          result += bigUnits[bigUnitPos]
        }
      } else {
        if (zeroCount > 0) result += '零'
        zeroCount = 0
        result += digits[digit] + units[unitPos]
        if (unitPos === 0) result += bigUnits[bigUnitPos]
      }
    }
  }

  result += '元'

  const jiao = parseInt(decPart[0])
  const fen = parseInt(decPart[1])

  if (jiao === 0 && fen === 0) {
    result += '整'
  } else {
    if (jiao > 0) result += digits[jiao] + '角'
    if (fen > 0) result += digits[fen] + '分'
  }

  return result
}

function copyResult() { if (result.value) navigator.clipboard.writeText(result.value) }
</script>

<style scoped>

.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
.amount-input { width: 200px; font-size: 16px; }
.result-section { margin-top: 16px; }
.result-text { font-size: 20px; font-weight: 600; color: var(--accent); padding: 8px 0; }
</style>

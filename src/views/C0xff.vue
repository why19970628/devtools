<template>
  <div class="tool-page">
    <div class="page-header">
      <h1>🔧 数据 0xFF 位运算换算</h1>
      <p>位运算与掩码计算工具</p>
    </div>
    <div class="action-bar">
      <select v-model="operation" class="lang-select">
        <option value="and">AND (&)</option>
        <option value="or">OR (|)</option>
        <option value="xor">XOR (^)</option>
        <option value="not">NOT (~)</option>
        <option value="shiftLeft">左移 (<)</option>
        <option value="shiftRight">右移 (>>)</option>
      </select>
      <button class="btn btn-primary" @click="calculate">计算</button>
    </div>
    <div class="io-grid">
      <div class="io-item">
        <label>操作数 A (Hex)</label>
        <input v-model="inputA" placeholder="如 0xFF" @input="calculate" />
      </div>
      <div class="io-item" v-if="operation !== 'not'">
        <label>操作数 B (Hex)</label>
        <input v-model="inputB" placeholder="如 0x0F" @input="calculate" />
      </div>
      <div class="io-item" v-if="operation === 'shiftLeft' || operation === 'shiftRight'">
        <label>移位位数</label>
        <input v-model.number="shiftBits" type="number" min="0" max="31" @input="calculate" />
      </div>
    </div>
    <div v-if="result !== null" class="result-section">
      <div class="card">
        <div class="card-header"><span class="card-title">计算结果</span></div>
        <div class="result-grid">
          <div class="result-item"><span class="result-label">十进制</span><span class="value">{{ result.dec }}</span></div>
          <div class="result-item"><span class="result-label">十六进制</span><span class="value">{{ result.hex }}</span></div>
          <div class="result-item"><span class="result-label">二进制</span><span class="value">{{ result.bin }}</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const operation = ref('and')
const inputA = ref('0xFF')
const inputB = ref('0x0F')
const shiftBits = ref(1)
const result = ref(null)

function calculate() {
  result.value = null
  const a = parseInt(inputA.value, 16)
  if (isNaN(a)) return
  let res
  switch (operation.value) {
    case 'and': res = a & parseInt(inputB.value, 16); break
    case 'or': res = a | parseInt(inputB.value, 16); break
    case 'xor': res = a ^ parseInt(inputB.value, 16); break
    case 'not': res = ~a; break
    case 'shiftLeft': res = a << shiftBits.value; break
    case 'shiftRight': res = a >> shiftBits.value; break
    default: return
  }
  result.value = {
    dec: res,
    hex: '0x' + (res >>> 0).toString(16).toUpperCase(),
    bin: (res >>> 0).toString(2).padStart(32, '0')
  }
}
</script>

<style scoped>

.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
.lang-select { width: 160px; }
.io-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
.io-item { display: flex; flex-direction: column; gap: 4px; }
.io-item label { font-size: 12px; color: var(--text-secondary); }
.io-item input { font-family: monospace; }
.result-section { margin-top: 16px; }
.result-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; }
.result-item { display: flex; flex-direction: column; gap: 4px; }
.result-label { font-size: 12px; color: var(--text-secondary); }
.value { font-family: monospace; font-size: 14px; }
</style>

<template>
  <div class="tool-page">
    <div class="page-header">
      <h1>🌐 IP 与 32位整数互转</h1>
      <p>IPv4 点分十进制地址与 32 位整型、十六进制、二进制实时双向转换</p>
    </div>
    <div class="io-grid">
      <div class="io-item">
        <label>IP 地址</label>
        <input v-model="ip" @input="fromIp" placeholder="如 192.168.1.1" />
      </div>
      <div class="io-item">
        <label>十进制整数</label>
        <input v-model="intVal" @input="fromInt" placeholder="如 3232235777" />
      </div>
      <div class="io-item">
        <label>十六进制</label>
        <input v-model="hexVal" @input="fromHex" placeholder="如 C0A80101" />
      </div>
      <div class="io-item">
        <label>二进制</label>
        <input v-model="binVal" @input="fromBin" placeholder="如 11000000..." />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const ip = ref('')
const intVal = ref('')
const hexVal = ref('')
const binVal = ref('')

function fromIp() {
  const parts = ip.value.split('.')
  if (parts.length !== 4 || parts.some(p => isNaN(parseInt(p)))) return
  const num = (parseInt(parts[0]) << 24) + (parseInt(parts[1]) << 16) + (parseInt(parts[2]) << 8) + parseInt(parts[3])
  intVal.value = num >>> 0
  hexVal.value = (num >>> 0).toString(16).toUpperCase().padStart(8, '0')
  binVal.value = (num >>> 0).toString(2).padStart(32, '0')
}

function fromInt() {
  const num = parseInt(intVal.value)
  if (isNaN(num)) return
  ip.value = [(num >>> 24) & 255, (num >>> 16) & 255, (num >>> 8) & 255, num & 255].join('.')
  hexVal.value = (num >>> 0).toString(16).toUpperCase().padStart(8, '0')
  binVal.value = (num >>> 0).toString(2).padStart(32, '0')
}

function fromHex() {
  const num = parseInt(hexVal.value, 16)
  if (isNaN(num)) return
  ip.value = [(num >>> 24) & 255, (num >>> 16) & 255, (num >>> 8) & 255, num & 255].join('.')
  intVal.value = num >>> 0
  binVal.value = (num >>> 0).toString(2).padStart(32, '0')
}

function fromBin() {
  const num = parseInt(binVal.value, 2)
  if (isNaN(num)) return
  ip.value = [(num >>> 24) & 255, (num >>> 16) & 255, (num >>> 8) & 255, num & 255].join('.')
  intVal.value = num >>> 0
  hexVal.value = (num >>> 0).toString(16).toUpperCase().padStart(8, '0')
}
</script>

<style scoped>

.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
.io-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.io-item { display: flex; flex-direction: column; gap: 4px; }
.io-item label { font-size: 12px; color: var(--text-secondary); }
.io-item input { font-family: monospace; font-size: 14px; }
</style>

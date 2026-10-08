<template>
  <div class="tool-page">
    <ToolHeader />
    <div class="action-bar">
      <input v-model="hexInput" type="text" placeholder="输入 16 进制报文，如 55 AA 01 02 03" class="hex-input" @input="parse" />
      <button class="btn btn-primary" @click="parse">解析</button>
    </div>
    <div v-if="parsed" class="result-section">
      <div class="card">
        <div class="card-header"><span class="card-title">解析结果</span></div>
        <div class="result-grid">
          <div class="result-item"><span class="result-label">原始报文</span><span class="value">{{ parsed.raw }}</span></div>
          <div class="result-item"><span class="result-label">长度</span><span class="value">{{ parsed.length }} 字节</span></div>
          <div class="result-item"><span class="result-label">校验和</span><span class="value">{{ parsed.checksum }}</span></div>
          <div class="result-item"><span class="result-label">ASCII</span><span class="value">{{ parsed.ascii }}</span></div>
        </div>
      </div>
      <div class="card" style="margin-top:12px">
        <div class="card-header"><span class="card-title">字节详情</span></div>
        <div class="byte-list">
          <div v-for="(byte, idx) in parsed.bytes" :key="idx" class="byte-item">
            <span class="byte-idx">{{ idx }}</span>
            <span class="byte-hex">{{ byte.hex }}</span>
            <span class="byte-dec">{{ byte.dec }}</span>
            <span class="byte-ascii">{{ byte.ascii }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const hexInput = ref('')
const parsed = ref(null)

function parse() {
  parsed.value = null
  if (!hexInput.value.trim()) return
  const hex = hexInput.value.trim().replace(/\s+/g, '')
  if (!/^[0-9A-Fa-f]+$/.test(hex)) return
  const bytes = hex.match(/.{2}/g) || []
  const byteData = bytes.map(h => {
    const dec = parseInt(h, 16)
    return { hex: h.toUpperCase(), dec, ascii: dec >= 32 && dec < 127 ? String.fromCharCode(dec) : '.' }
  })
  const checksum = bytes.reduce((sum, h) => sum + parseInt(h, 16), 0) & 0xFF
  parsed.value = {
    raw: bytes.join(' '),
    length: bytes.length,
    checksum: '0x' + checksum.toString(16).toUpperCase().padStart(2, '0'),
    ascii: byteData.map(b => b.ascii).join(''),
    bytes: byteData
  }
}
</script>

<style scoped>

.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
.hex-input { flex: 1; font-family: monospace; }
.result-section { margin-top: 16px; }
.result-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.result-item { display: flex; flex-direction: column; gap: 4px; }
.result-label { font-size: 12px; color: var(--text-secondary); }
.value { font-family: monospace; font-size: 14px; }
.byte-list { display: flex; flex-direction: column; gap: 2px; font-family: monospace; font-size: 12px; }
.byte-item { display: flex; gap: 12px; padding: 4px 8px; background: var(--bg-tertiary); border-radius: 4px; }
.byte-idx { min-width: 30px; color: var(--text-muted); }
.byte-hex { min-width: 40px; color: var(--accent); }
.byte-dec { min-width: 40px; }
.byte-ascii { color: var(--success); }
</style>

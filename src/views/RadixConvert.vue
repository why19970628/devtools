<template>
  <div class="tool-page">
    <ToolHeader />
    <div class="radix-grid">
      <div class="radix-item">
        <label>二进制 (BIN)</label>
        <input v-model="bin" @input="convertFrom('bin')" placeholder="0b1010" />
      </div>
      <div class="radix-item">
        <label>八进制 (OCT)</label>
        <input v-model="oct" @input="convertFrom('oct')" placeholder="0o12" />
      </div>
      <div class="radix-item">
        <label>十进制 (DEC)</label>
        <input v-model="dec" @input="convertFrom('dec')" placeholder="10" />
      </div>
      <div class="radix-item">
        <label>十六进制 (HEX)</label>
        <input v-model="hex" @input="convertFrom('hex')" placeholder="0xA" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const bin = ref('')
const oct = ref('')
const dec = ref('')
const hex = ref('')

function convertFrom(source) {
  let value
  try {
    if (source === 'bin') value = parseInt(bin.value.replace(/^0b/i, ''), 2)
    else if (source === 'oct') value = parseInt(oct.value.replace(/^0o/i, ''), 8)
    else if (source === 'dec') value = parseInt(dec.value, 10)
    else value = parseInt(hex.value.replace(/^0x/i, ''), 16)
    if (isNaN(value)) return
    bin.value = '0b' + value.toString(2)
    oct.value = '0o' + value.toString(8)
    dec.value = value.toString(10)
    hex.value = '0x' + value.toString(16).toUpperCase()
  } catch (e) { /* ignore */ }
}
</script>

<style scoped>

.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
.radix-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.radix-item { display: flex; flex-direction: column; gap: 6px; }
.radix-item label { font-size: 13px; font-weight: 600; color: var(--text-secondary); }
.radix-item input { font-family: monospace; font-size: 16px; padding: 10px 14px; }
</style>

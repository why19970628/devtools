<template>
  <div class="tool-page">
    <div class="page-header">
      <h1>🎨 RGB / HEX 颜色互转</h1>
      <p>HEX 16进制与 RGB / RGBA 互转，集成实时取色器与调色板</p>
    </div>
    <div class="color-picker-section">
      <input type="color" v-model="pickerColor" @input="fromPicker" class="color-picker" />
      <div class="color-preview" :style="{ background: pickerColor }"></div>
    </div>
    <div class="io-grid">
      <div class="io-item">
        <label>HEX</label>
        <input v-model="hex" @input="fromHex" placeholder="#FF5733" />
      </div>
      <div class="io-item">
        <label>R</label>
        <input v-model.number="r" type="number" min="0" max="255" @input="fromRgb" />
      </div>
      <div class="io-item">
        <label>G</label>
        <input v-model.number="g" type="number" min="0" max="255" @input="fromRgb" />
      </div>
      <div class="io-item">
        <label>B</label>
        <input v-model.number="b" type="number" min="0" max="255" @input="fromRgb" />
      </div>
      <div class="io-item">
        <label>A</label>
        <input v-model.number="a" type="number" min="0" max="1" step="0.01" @input="fromRgb" />
      </div>
    </div>
    <div class="action-bar">
      <button class="btn" @click="copyHex">复制 HEX</button>
      <button class="btn" @click="copyRgb">复制 RGB</button>
      <button class="btn" @click="copyRgba">复制 RGBA</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const pickerColor = ref('#58a6ff')
const hex = ref('#58A6FF')
const r = ref(88)
const g = ref(166)
const b = ref(255)
const a = ref(1)

function fromPicker() {
  hex.value = pickerColor.value.toUpperCase()
  const rgb = hexToRgb(hex.value)
  r.value = rgb.r; g.value = rgb.g; b.value = rgb.b
}

function fromHex() {
  const rgb = hexToRgb(hex.value)
  if (rgb) { r.value = rgb.r; g.value = rgb.g; b.value = rgb.b; pickerColor.value = hex.value }
}

function fromRgb() {
  hex.value = rgbToHex(r.value, g.value, b.value)
  pickerColor.value = hex.value
}

function hexToRgb(hex) {
  const m = hex.replace('#', '').match(/^([A-Fa-f]{2})([A-Fa-f]{2})([A-Fa-f]{2})$/)
  if (!m) return null
  return { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) }
}

function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map(v => Math.max(0, Math.min(255, v || 0)).toString(16).padStart(2, '0')).join('').toUpperCase()
}

function copyHex() { navigator.clipboard.writeText(hex.value) }
function copyRgb() { navigator.clipboard.writeText(`rgb(${r.value}, ${g.value}, ${b.value})`) }
function copyRgba() { navigator.clipboard.writeText(`rgba(${r.value}, ${g.value}, ${b.value}, ${a.value})`) }
</script>

<style scoped>

.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
.color-picker-section { display: flex; align-items: center; gap: 16px; margin-bottom: 20px; }
.color-picker { width: 60px; height: 40px; border: none; cursor: pointer; }
.color-preview { width: 60px; height: 40px; border-radius: var(--radius); border: 1px solid var(--border-color); }
.io-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px; margin-bottom: 16px; }
.io-item { display: flex; flex-direction: column; gap: 4px; }
.io-item label { font-size: 12px; color: var(--text-secondary); }
.io-item input { font-family: monospace; }
</style>

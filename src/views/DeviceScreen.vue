<template>
  <div class="tool-page">
    <ToolHeader />
    <div class="device-table">
      <table>
        <thead>
          <tr>
            <th>设备</th>
            <th>逻辑分辨率</th>
            <th>物理分辨率</th>
            <th>DPR</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="device in devices" :key="device.name">
            <td>{{ device.name }}</td>
            <td>{{ device.logical }}</td>
            <td>{{ device.physical }}</td>
            <td>{{ device.dpr }}x</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const devices = ref([
  { name: 'iPhone 15 Pro Max', logical: '430x932', physical: '1290x2796', dpr: 3 },
  { name: 'iPhone 15 Pro', logical: '393x852', physical: '1179x2556', dpr: 3 },
  { name: 'iPhone 15', logical: '390x844', physical: '1179x2556', dpr: 3 },
  { name: 'iPhone 14', logical: '390x844', physical: '1170x2532', dpr: 3 },
  { name: 'iPhone SE', logical: '375x667', physical: '750x1334', dpr: 2 },
  { name: 'iPad Pro 12.9"', logical: '1024x1366', physical: '2048x2732', dpr: 2 },
  { name: 'iPad Pro 11"', logical: '834x1194', physical: '1668x2388', dpr: 2 },
  { name: 'iPad Air', logical: '820x1180', physical: '1640x2360', dpr: 2 },
  { name: 'iPad mini', logical: '744x1133', physical: '1488x2266', dpr: 2 },
  { name: 'Samsung S24 Ultra', logical: '412x915', physical: '1440x3120', dpr: 3 },
  { name: 'Samsung S24', logical: '360x780', physical: '1080x2340', dpr: 3 },
  { name: 'Pixel 8 Pro', logical: '412x892', physical: '1344x2992', dpr: 3 },
  { name: 'Pixel 8', logical: '412x892', physical: '1080x2400', dpr: 2.625 },
  { name: 'Xiaomi 14', logical: '393x852', physical: '1200x2670', dpr: 3 },
  { name: 'Huawei Mate 60 Pro', logical: '412x892', physical: '1260x2720', dpr: 3 },
])
</script>

<style scoped>

.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
.device-table { overflow-x: auto; border: 1px solid var(--border-color); border-radius: var(--radius); }
table { width: 100%; border-collapse: collapse; font-size: 13px; }
th, td { padding: 10px 14px; text-align: left; border-bottom: 1px solid var(--border-color); }
th { background: var(--bg-tertiary); font-weight: 600; }
tr:hover td { background: var(--bg-hover); }
</style>

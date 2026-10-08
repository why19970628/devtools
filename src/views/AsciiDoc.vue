<template>
  <div class="tool-page">
    <div class="page-header">
      <h1>🔣 ASCII 码完整对照表</h1>
      <p>0-127 完整 ASCII 码，十进制、十六进制、二进制与字符含义对照</p>
    </div>
    <div class="ascii-table">
      <table>
        <thead>
          <tr>
            <th>十进制</th>
            <th>十六进制</th>
            <th>二进制</th>
            <th>字符</th>
            <th>含义</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in asciiTable" :key="item.dec">
            <td>{{ item.dec }}</td>
            <td>{{ item.hex }}</td>
            <td>{{ item.bin }}</td>
            <td class="char-cell">{{ item.char }}</td>
            <td>{{ item.desc }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const asciiTable = ref([])

function generateTable() {
  const table = []
  const controlChars = {
    0: 'NUL (空字符)', 1: 'SOH (标题开始)', 2: 'STX (正文开始)', 3: 'ETX (正文结束)',
    4: 'EOT (传输结束)', 5: 'ENQ (询问)', 6: 'ACK (确认)', 7: 'BEL (响铃)',
    8: 'BS (退格)', 9: 'HT (水平制表)', 10: 'LF (换行)', 11: 'VT (垂直制表)',
    12: 'FF (换页)', 13: 'CR (回车)', 14: 'SO (移出)', 15: 'SI (移入)',
    16: 'DLE (数据链路转义)', 17: 'DC1 (设备控制1)', 18: 'DC2 (设备控制2)',
    19: 'DC3 (设备控制3)', 20: 'DC4 (设备控制4)', 21: 'NAK (否定确认)',
    22: 'SYN (同步空闲)', 23: 'ETB (传输块结束)', 24: 'CAN (取消)',
    25: 'EM (介质结束)', 26: 'SUB (替换)', 27: 'ESC (转义)',
    28: 'FS (文件分隔符)', 29: 'GS (组分隔符)', 30: 'RS (记录分隔符)',
    31: 'US (单元分隔符)', 32: 'Space (空格)', 127: 'DEL (删除)'
  }
  for (let i = 0; i < 128; i++) {
    table.push({
      dec: i,
      hex: '0x' + i.toString(16).toUpperCase().padStart(2, '0'),
      bin: i.toString(2).padStart(8, '0'),
      char: i >= 32 && i < 127 ? String.fromCharCode(i) : '·',
      desc: controlChars[i] || (i >= 32 && i < 127 ? '可打印字符' : '')
    })
  }
  asciiTable.value = table
}

generateTable()
</script>

<style scoped>

.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
.ascii-table { overflow-x: auto; border: 1px solid var(--border-color); border-radius: var(--radius); max-height: 600px; overflow-y: auto; }
table { width: 100%; border-collapse: collapse; font-size: 12px; }
th, td { padding: 6px 10px; text-align: left; border-bottom: 1px solid var(--border-color); }
th { background: var(--bg-tertiary); font-weight: 600; position: sticky; top: 0; }
tr:hover td { background: var(--bg-hover); }
.char-cell { font-family: monospace; font-weight: 700; color: var(--accent); }
</style>

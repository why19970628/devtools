<template>
  <div class="tool-page">
    <ToolHeader />
    <div class="permission-list">
      <div v-for="perm in permissions" :key="perm.name" class="permission-item">
        <span class="perm-name">{{ perm.name }}</span>
        <span class="perm-level" :class="perm.level">{{ perm.level }}</span>
        <span class="perm-desc">{{ perm.desc }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const permissions = ref([
  { name: 'android.permission.INTERNET', level: 'normal', desc: '访问网络连接' },
  { name: 'android.permission.ACCESS_NETWORK_STATE', level: 'normal', desc: '获取网络状态' },
  { name: 'android.permission.ACCESS_WIFI_STATE', level: 'normal', desc: '获取 WiFi 状态' },
  { name: 'android.permission.CHANGE_WIFI_STATE', level: 'normal', desc: '改变 WiFi 状态' },
  { name: 'android.permission.BLUETOOTH', level: 'normal', desc: '连接蓝牙设备' },
  { name: 'android.permission.BLUETOOTH_ADMIN', level: 'normal', desc: '管理蓝牙设置' },
  { name: 'android.permission.CAMERA', level: 'dangerous', desc: '使用相机拍照' },
  { name: 'android.permission.RECORD_AUDIO', level: 'dangerous', desc: '录制音频' },
  { name: 'android.permission.READ_EXTERNAL_STORAGE', level: 'dangerous', desc: '读取外部存储' },
  { name: 'android.permission.WRITE_EXTERNAL_STORAGE', level: 'dangerous', desc: '写入外部存储' },
  { name: 'android.permission.READ_MEDIA_IMAGES', level: 'dangerous', desc: '读取图片 (Android 13+)' },
  { name: 'android.permission.READ_MEDIA_VIDEO', level: 'dangerous', desc: '读取视频 (Android 13+)' },
  { name: 'android.permission.READ_MEDIA_AUDIO', level: 'dangerous', desc: '读取音频 (Android 13+)' },
  { name: 'android.permission.ACCESS_FINE_LOCATION', level: 'dangerous', desc: '精确位置 (GPS)' },
  { name: 'android.permission.ACCESS_COARSE_LOCATION', level: 'dangerous', desc: '粗略位置 (网络)' },
  { name: 'android.permission.ACCESS_BACKGROUND_LOCATION', level: 'dangerous', desc: '后台位置访问' },
  { name: 'android.permission.READ_CONTACTS', level: 'dangerous', desc: '读取联系人' },
  { name: 'android.permission.WRITE_CONTACTS', level: 'dangerous', desc: '写入联系人' },
  { name: 'android.permission.READ_PHONE_STATE', level: 'dangerous', desc: '读取手机状态' },
  { name: 'android.permission.CALL_PHONE', level: 'dangerous', desc: '拨打电话' },
  { name: 'android.permission.READ_CALL_LOG', level: 'dangerous', desc: '读取通话记录' },
  { name: 'android.permission.WRITE_CALL_LOG', level: 'dangerous', desc: '写入通话记录' },
  { name: 'android.permission.SEND_SMS', level: 'dangerous', desc: '发送短信' },
  { name: 'android.permission.RECEIVE_SMS', level: 'dangerous', desc: '接收短信' },
  { name: 'android.permission.READ_SMS', level: 'dangerous', desc: '读取短信' },
  { name: 'android.permission.READ_CALENDAR', level: 'dangerous', desc: '读取日历' },
  { name: 'android.permission.WRITE_CALENDAR', level: 'dangerous', desc: '写入日历' },
  { name: 'android.permission.VIBRATE', level: 'normal', desc: '控制振动' },
  { name: 'android.permission.WAKE_LOCK', level: 'normal', desc: '保持 CPU 唤醒' },
  { name: 'android.permission.FOREGROUND_SERVICE', level: 'normal', desc: '前台服务' },
  { name: 'android.permission.POST_NOTIFICATIONS', level: 'dangerous', desc: '发送通知 (Android 13+)' },
  { name: 'android.permission.REQUEST_INSTALL_PACKAGES', level: 'normal', desc: '请求安装包' },
  { name: 'android.permission.SYSTEM_ALERT_WINDOW', level: 'signature', desc: '悬浮窗权限' },
  { name: 'android.permission.BIND_ACCESSIBILITY_SERVICE', level: 'signature', desc: '无障碍服务' },
])
</script>

<style scoped>

.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
.permission-list { display: flex; flex-direction: column; gap: 4px; }
.permission-item { display: flex; align-items: center; gap: 12px; padding: 8px 14px; background: var(--bg-secondary); border-radius: var(--radius-sm); }
.perm-name { font-family: monospace; font-size: 12px; min-width: 350px; color: var(--accent); }
.perm-level { font-size: 11px; padding: 2px 8px; border-radius: 10px; }
.perm-level.normal { background: rgba(63,185,80,0.15); color: var(--success); }
.perm-level.dangerous { background: rgba(210,153,34,0.15); color: var(--warning); }
.perm-level.signature { background: rgba(248,81,73,0.15); color: var(--danger); }
.perm-desc { color: var(--text-secondary); font-size: 13px; }
</style>

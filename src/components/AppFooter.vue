<template>
  <footer class="app-footer">
    <div class="footer-inner">
      <div class="footer-row">
        <span>🔧 DevTools 开发者工具箱</span>
        <span>·</span>
        <span>线上 {{ tools.length }} 款工具</span>
        <span>·</span>
        <span>纯前端实现，数据不出本地</span>
        <span style="flex:1"></span>
        <span>Copyright © 2011-2026 开发者在线工具 All rights reserved.</span>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { tools } from '../utils/tools'
</script>
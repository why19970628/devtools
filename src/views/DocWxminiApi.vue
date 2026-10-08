<template>
  <LinkDoc title="📱 微信小程序 API 文档" desc="微信小程序后端接口 API 文档" :links="links" />
</template>
<script setup>
import LinkDoc from '../components/LinkDoc.vue'
const links = [
  { name: '小程序 API 文档', url: 'https://developers.weixin.qq.com/miniprogram/dev/api/' },
  { name: '小程序服务端接口', url: 'https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/signature.html' },
  { name: '小程序账号与登录', url: 'https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/login.html' },
]
</script>

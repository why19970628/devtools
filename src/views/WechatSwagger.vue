<template>
  <LinkDoc title="📖 微信接口 Swagger 文档导航" desc="微信小程序、公众号、支付相关接口文档入口" :links="links" />
</template>
<script setup>
import LinkDoc from '../components/LinkDoc.vue'
const links = [
  { name: '小程序服务端 API', url: 'https://developers.weixin.qq.com/miniprogram/dev/api/' },
  { name: '公众号开发者文档', url: 'https://developers.weixin.qq.com/doc/offiaccount/' },
  { name: '微信支付开发者文档', url: 'https://pay.weixin.qq.com/docs/merchant/' },
  { name: '企业微信 API 文档', url: 'https://developer.work.weixin.qq.com/document/path/90556' },
  { name: '微信开放平台文档', url: 'https://open.weixin.qq.com/' },
  { name: '微信硬件平台文档', url: 'https://iot.weixin.qq.com/' },
]
</script>

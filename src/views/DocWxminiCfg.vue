<template>
  <LinkDoc title="⚙️ 微信小程序配置文档" desc="小程序配置、域名白名单与发布相关文档" :links="links" />
</template>
<script setup>
import LinkDoc from '../components/LinkDoc.vue'
const links = [
  { name: '小程序服务器域名配置', url: 'https://developers.weixin.qq.com/miniprogram/dev/framework/ability/network.html' },
  { name: '小程序配置 app.json', url: 'https://developers.weixin.qq.com/miniprogram/dev/framework/configuration/' },
  { name: '小程序发布上线流程', url: 'https://developers.weixin.qq.com/miniprogram/dev/framework/quickstart/release.html' },
]
</script>

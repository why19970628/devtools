<template>
  <LinkDoc title="📢 微信公众号开发文档" desc="微信公众号（服务号/订阅号）开发接口文档" :links="links" />
</template>
<script setup>
import LinkDoc from '../components/LinkDoc.vue'
const links = [
  { name: '公众号接口文档', url: 'https://developers.weixin.qq.com/doc/offiaccount/' },
  { name: '公众号网页 JS-SDK', url: 'https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html' },
  { name: '公众号消息与事件', url: 'https://developers.weixin.qq.com/doc/offiaccount/Message_Management/Receiving_messages.html' },
]
</script>

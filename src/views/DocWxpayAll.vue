<template>
  <LinkDoc title="💳 微信支付接口总览" desc="微信支付全部接口文档索引" :links="links" />
</template>
<script setup>
import LinkDoc from '../components/LinkDoc.vue'
const links = [
  { name: '微信支付产品接口', url: 'https://pay.weixin.qq.com/docs/merchant/products/' },
  { name: '微信支付公共接口', url: 'https://pay.weixin.qq.com/docs/merchant/development/interface-rules/' },
  { name: '微信支付 SDK 与工具', url: 'https://pay.weixin.qq.com/wiki/doc/apiv3/index.shtml' },
]
</script>

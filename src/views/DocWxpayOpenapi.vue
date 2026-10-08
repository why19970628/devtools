<template>
  <LinkDoc title="💳 微信支付开放接口文档" desc="微信支付开放平台接口文档" :links="links" />
</template>
<script setup>
import LinkDoc from '../components/LinkDoc.vue'
const links = [
  { name: '微信支付开发者文档', url: 'https://pay.weixin.qq.com/docs/merchant/' },
  { name: '微信支付 APIv3', url: 'https://pay.weixin.qq.com/docs/merchant/apis/native-payment/direct-jsons/native-jsons-notify.html' },
  { name: '微信支付 v2 接口文档', url: 'https://pay.weixin.qq.com/wiki/doc/apiv3/index.shtml' },
]
</script>

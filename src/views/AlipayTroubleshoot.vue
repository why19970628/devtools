<template>
  <div class="tool-page">
    <ToolHeader />
    <div class="action-bar">
      <input v-model="keyword" type="text" placeholder="搜索错误码或关键字，如 40002" class="search-input" />
    </div>
    <div class="error-list">
      <div v-for="item in filtered" :key="item.code" class="error-item">
        <div class="error-header">
          <span class="error-code">{{ item.code }}</span>
          <span class="error-msg">{{ item.msg }}</span>
        </div>
        <div class="error-fix">{{ item.fix }}</div>
      </div>
      <div v-if="!filtered.length" class="empty-state">无匹配结果</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const keyword = ref('')

const errors = ref([
  { code: '40001', msg: '非法签名', fix: '检查加签字段排序、空值剔除、编码是否与文档一致；确认使用正确的应用私钥。' },
  { code: '40002', msg: '无效参数', fix: '检查必填参数是否缺失，参数格式（金额单位为分、时间格式）是否正确。' },
  { code: '40003', msg: '商户账号无效', fix: '确认 PID/appId 归属，检查应用是否上线、签约产品是否生效。' },
  { code: '40004', msg: '业务处理失败', fix: '查看 sub_code/sub_msg 获取具体业务原因，常见于交易不可用、订单状态不对。' },
  { code: '40005', msg: '参数格式错误', fix: '检查 JSON/XML 格式、特殊字符转义（& < > "）、编码是否 UTF-8。' },
  { code: '40006', msg: '外部服务异常', fix: '支付宝侧服务波动，稍后重试；持续出现则联系支付宝技术支持。' },
  { code: '40007', msg: '签名验证失败', fix: '同步/异步返回验签，公钥证书模式需用支付宝公钥（证书 serial_no）验签。' },
  { code: '40008', msg: '系统错误', fix: '重试并记录交易号；持续出现联系支付宝技术支持。' },
  { code: '40009', msg: '业务权限不足', fix: '确认应用是否已签约对应产品接口，检查接口调用权限。' },
  { code: '40010', msg: '业务限流', fix: '对调用方做重试退避（指数退避），确认 QPS 是否超过配额。' },
  { code: '40011', msg: '加密失败', fix: '确认加密算法与内容编码，公钥证书是否正确，证书是否过期。' },
  { code: '40012', msg: '解密失败', fix: '应答密文使用应用私钥解密，检查密钥与密文版本是否匹配。' },
  { code: '40013', msg: 'appId 无效', fix: '检查 app_id 是否正确且未下架，是否传成了 appId 的其他环境值。' },
  { code: '40014', msg: '不支持的加密类型', fix: '检查 encrypt_type 参数与密钥算法是否匹配（AES/RSA2）。' },
  { code: '40015', msg: '不支持的接口版本', fix: '升级 SDK；网关接口需传正确的 method 与版本参数。' },
  { code: '40016', msg: '接口权限校验失败', fix: '应用未签约该产品，或调用的 API 属于其他应用场景（自研/服务商）。' },
  { code: '40017', msg: '字段验证失败', fix: '按 error_fields 提示逐个校验字段长度、类型、枚举值。' },
  { code: '40018', msg: '证书链验证失败', fix: '更新根证书，确认证书链完整且未过期。' },
  { code: '40019', msg: '商户 UID 无效', fix: '确认 userId/buyer_id 来源，是否混用了沙箱/正式环境。' },
  { code: '40020', msg: '触发风控', fix: '按返回的风险提示处理，必要时走申诉或更换环境参数。' },
])

const filtered = computed(() => {
  if (!keyword.value.trim()) return errors.value
  const kw = keyword.value.toLowerCase()
  return errors.value.filter(e => (e.code + e.msg + e.fix).toLowerCase().includes(kw))
})
</script>

<style scoped>

.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
.search-input { width: 300px; }
.error-list { display: flex; flex-direction: column; gap: 8px; }
.error-item { padding: 12px 16px; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: var(--radius); }
.error-header { display: flex; align-items: center; gap: 12px; margin-bottom: 4px; }
.error-code { font-family: monospace; font-weight: 600; color: var(--accent); }
.error-msg { font-weight: 500; }
.error-fix { font-size: 13px; color: var(--text-secondary); }
.empty-state { color: var(--text-secondary); text-align: center; padding: 20px; }
</style>

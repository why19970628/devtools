<template>
  <div class="tool-page">
    <ToolHeader />
    <div class="port-list">
      <div v-for="port in ports" :key="port.port" class="port-item">
        <span class="port-number">{{ port.port }}</span>
        <span class="port-service">{{ port.service }}</span>
        <span class="port-desc">{{ port.desc }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const ports = ref([
  { port: 21, service: 'FTP', desc: '文件传输协议' },
  { port: 22, service: 'SSH', desc: '安全外壳协议' },
  { port: 23, service: 'Telnet', desc: '远程登录协议' },
  { port: 25, service: 'SMTP', desc: '简单邮件传输协议' },
  { port: 53, service: 'DNS', desc: '域名系统' },
  { port: 80, service: 'HTTP', desc: '超文本传输协议' },
  { port: 110, service: 'POP3', desc: '邮局协议 v3' },
  { port: 143, service: 'IMAP', desc: '互联网消息访问协议' },
  { port: 443, service: 'HTTPS', desc: 'HTTP over TLS/SSL' },
  { port: 445, service: 'SMB', desc: '服务器消息块' },
  { port: 993, service: 'IMAPS', desc: 'IMAP over SSL' },
  { port: 995, service: 'POP3S', desc: 'POP3 over SSL' },
  { port: 1433, service: 'MSSQL', desc: 'Microsoft SQL Server' },
  { port: 1521, service: 'Oracle', desc: 'Oracle 数据库默认端口' },
  { port: 3306, service: 'MySQL', desc: 'MySQL 数据库' },
  { port: 3389, service: 'RDP', desc: '远程桌面协议' },
  { port: 5432, service: 'PostgreSQL', desc: 'PostgreSQL 数据库' },
  { port: 5900, service: 'VNC', desc: '虚拟网络计算' },
  { port: 6379, service: 'Redis', desc: 'Redis 缓存数据库' },
  { port: 8080, service: 'HTTP Alt', desc: 'HTTP 替代端口' },
  { port: 8443, service: 'HTTPS Alt', desc: 'HTTPS 替代端口' },
  { port: 9092, service: 'Kafka', desc: 'Apache Kafka' },
  { port: 2181, service: 'ZooKeeper', desc: 'ZooKeeper 默认端口' },
  { port: 2379, service: 'etcd', desc: 'etcd 客户端端口' },
  { port: 2380, service: 'etcd peer', desc: 'etcd 对等端口' },
  { port: 5672, service: 'AMQP', desc: 'RabbitMQ 消息队列' },
  { port: 15672, service: 'RabbitMQ Mgmt', desc: 'RabbitMQ 管理界面' },
  { port: 8848, service: 'Nacos', desc: 'Nacos 默认端口' },
  { port: 9000, service: 'Hadoop', desc: 'Hadoop NameNode' },
  { port: 50070, service: 'Hadoop Web', desc: 'Hadoop Web UI' },
  { port: 7077, service: 'Spark', desc: 'Spark Master' },
  { port: 4040, service: 'Spark UI', desc: 'Spark Web UI' },
  { port: 8088, service: 'YARN', desc: 'YARN ResourceManager' },
  { port: 8888, service: 'Jupyter', desc: 'Jupyter Notebook' },
  { port: 3000, service: 'Dev Server', desc: '常用开发服务器端口' },
  { port: 5173, service: 'Vite', desc: 'Vite 开发服务器' },
  { port: 8000, service: 'Django', desc: 'Django 开发服务器' },
  { port: 8001, service: 'Nacos Console', desc: 'Nacos 控制台' },
])
</script>

<style scoped>

.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
.port-list { display: flex; flex-direction: column; gap: 4px; }
.port-item { display: flex; align-items: center; gap: 16px; padding: 8px 14px; background: var(--bg-secondary); border-radius: var(--radius-sm); }
.port-number { font-family: monospace; font-weight: 700; font-size: 16px; min-width: 60px; color: var(--accent); }
.port-service { font-weight: 600; min-width: 120px; }
.port-desc { color: var(--text-secondary); font-size: 13px; }
</style>

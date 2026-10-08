<template>
  <div class="tool-page">
    <div class="page-header">
      <h1>⚙️ 开发环境依赖</h1>
      <p>常用开发环境搭建与依赖配置速查</p>
    </div>
    <div class="env-grid">
      <div v-for="env in envs" :key="env.name" class="env-card">
        <div class="card-header"><span class="card-title">{{ env.name }}</span></div>
        <div class="env-content">
          <div v-for="(item, idx) in env.items" :key="idx" class="env-item">
            <span class="env-label">{{ item.label }}</span>
            <code class="env-value">{{ item.value }}</code>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const envs = ref([
  {
    name: 'Node.js',
    items: [
      { label: '安装', value: 'brew install node' },
      { label: '版本', value: 'node -v' },
      { label: 'npm 镜像', value: 'npm config set registry https://registry.npmmirror.com' },
      { label: 'yarn', value: 'npm install -g yarn' },
      { label: 'pnpm', value: 'npm install -g pnpm' },
    ]
  },
  {
    name: 'Java',
    items: [
      { label: '安装', value: 'brew install openjdk@17' },
      { label: '版本', value: 'java -version' },
      { label: 'JAVA_HOME', value: 'export JAVA_HOME=$(/usr/libexec/java_home)' },
      { label: 'Maven', value: 'brew install maven' },
      { label: 'Gradle', value: 'brew install gradle' },
    ]
  },
  {
    name: 'Python',
    items: [
      { label: '安装', value: 'brew install python@3.12' },
      { label: '版本', value: 'python3 --version' },
      { label: '虚拟环境', value: 'python3 -m venv .venv' },
      { label: '激活', value: 'source .venv/bin/activate' },
      { label: 'pip 镜像', value: 'pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple' },
    ]
  },
  {
    name: 'Docker',
    items: [
      { label: '安装', value: 'brew install --cask docker' },
      { label: '启动', value: 'open -a Docker' },
      { label: '镜像加速', value: '在 Docker Desktop 中配置 registry-mirrors' },
      { label: '常用命令', value: 'docker ps / docker images / docker logs' },
    ]
  },
  {
    name: 'Git',
    items: [
      { label: '安装', value: 'brew install git' },
      { label: '配置用户', value: 'git config --global user.name "Your Name"' },
      { label: '配置邮箱', value: 'git config --global user.email "your@email.com"' },
      { label: 'SSH 密钥', value: 'ssh-keygen -t ed25519 -C "your@email.com"' },
      { label: '代理', value: 'git config --global http.proxy http://127.0.0.1:7890' },
    ]
  },
  {
    name: '数据库',
    items: [
      { label: 'MySQL', value: 'brew install mysql' },
      { label: 'PostgreSQL', value: 'brew install postgresql@16' },
      { label: 'Redis', value: 'brew install redis' },
      { label: 'MongoDB', value: 'brew install mongodb-community' },
      { label: '启动服务', value: 'brew services start mysql' },
    ]
  },
])
</script>

<style scoped>

.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
.env-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.env-content { display: flex; flex-direction: column; gap: 8px; }
.env-item { display: flex; flex-direction: column; gap: 2px; }
.env-label { font-size: 12px; color: var(--text-secondary); }
.env-value { font-family: monospace; font-size: 12px; background: var(--bg-tertiary); padding: 4px 8px; border-radius: 4px; }
</style>

<template>
  <div class="tool-page">
    <div class="page-header">
      <h1>☕ Maven 本地 Jar 安装命令生成</h1>
      <p>快速生成 mvn install:install-file 命令行及对应 pom.xml 的 dependency 依赖</p>
    </div>
    <div class="config-grid">
      <div class="config-item">
        <label>GroupId</label>
        <input v-model="groupId" type="text" placeholder="com.example" class="full-input" />
      </div>
      <div class="config-item">
        <label>ArtifactId</label>
        <input v-model="artifactId" type="text" placeholder="my-lib" class="full-input" />
      </div>
      <div class="config-item">
        <label>Version</label>
        <input v-model="version" type="text" placeholder="1.0.0" class="full-input" />
      </div>
      <div class="config-item">
        <label>Jar 文件路径</label>
        <input v-model="jarPath" type="text" placeholder="/path/to/my-lib-1.0.0.jar" class="full-input" />
      </div>
    </div>
    <div class="action-bar">
      <button class="btn btn-primary" @click="generate">生成</button>
      <button class="btn" @click="copyResult">复制结果</button>
    </div>
    <div v-if="output" class="result-section">
      <div class="card">
        <div class="card-header"><span class="card-title">Maven 命令</span></div>
        <pre class="code-block">{{ output }}</pre>
      </div>
      <div class="card" style="margin-top:12px">
        <div class="card-header"><span class="card-title">pom.xml 依赖</span></div>
        <pre class="code-block">{{ pomDependency }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const groupId = ref('com.example')
const artifactId = ref('my-lib')
const version = ref('1.0.0')
const jarPath = ref('/path/to/my-lib-1.0.0.jar')
const output = ref('')
const pomDependency = ref('')

function generate() {
  output.value = `mvn install:install-file -Dfile=${jarPath.value} -DgroupId=${groupId.value} -DartifactId=${artifactId.value} -Dversion=${version.value} -Dpackaging=jar`
  pomDependency.value = `<dependency>\n    <groupId>${groupId.value}</groupId>\n    <artifactId>${artifactId.value}</artifactId>\n    <version>${version.value}</version>\n</dependency>`
}

function copyResult() {
  if (output.value) navigator.clipboard.writeText(output.value + '\n\n' + pomDependency.value)
}
</script>

<style scoped>

.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
.config-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px; }
.config-item { display: flex; flex-direction: column; gap: 4px; }
.config-item label { font-size: 12px; color: var(--text-secondary); }
.full-input { width: 100%; }
.result-section { margin-top: 16px; }
.code-block { background: var(--bg-tertiary); padding: 14px; border-radius: var(--radius); font-family: monospace; font-size: 13px; white-space: pre-wrap; }
</style>

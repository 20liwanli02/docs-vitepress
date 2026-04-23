<script setup lang="ts">
import { ref, provide } from 'vue'

const keyword = ref('')

provide('projectSearchKeyword', keyword)
</script>

<template>
  <div class="project-search">
    <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
    <input
      v-model="keyword"
      type="text"
      class="search-input"
      placeholder="搜索项目名称..."
    />
    <span v-if="keyword" class="search-clear" @click="keyword = ''">✕</span>
  </div>
</template>

<style scoped>
.project-search {
  position: relative;
  max-width: 480px;
  margin: 0 auto 32px;
}

.search-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--vp-c-text-3);
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 10px 40px 10px 42px;
  font-size: 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  outline: none;
  transition: all 0.2s ease;
  box-sizing: border-box;
}

.search-input::placeholder {
  color: var(--vp-c-text-3);
}

.search-input:focus {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 3px var(--vp-c-brand-soft);
}

.search-clear {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: var(--vp-c-text-3);
  font-size: 14px;
  line-height: 1;
  padding: 2px;
  border-radius: 50%;
  transition: color 0.2s;
}

.search-clear:hover {
  color: var(--vp-c-text-1);
}
</style>

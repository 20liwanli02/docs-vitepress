<script setup lang="ts">
import { computed, inject, type Ref } from 'vue'

interface Project {
  name: string
  description: string
  url: string
  level?: '入门' | '进阶' | '高级' | '实战'
  order?: number
  tags: string[]
}

const props = defineProps<{
  title: string
  projects: Project[]
}>()

const keyword = inject<Ref<string>>('projectSearchKeyword', { value: '' })

const sortedProjects = computed(() => {
  return [...props.projects]
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
    .filter(p => !keyword.value || p.name.toLowerCase().includes(keyword.value.toLowerCase()))
})

const hasResults = computed(() => sortedProjects.value.length > 0)
</script>

<template>
  <div v-if="hasResults" class="project-section">
    <h2 class="section-title">{{ title }}</h2>
    <div class="project-grid">
      <a 
        v-for="project in sortedProjects" 
        :key="project.name" 
        :href="project.url" 
        target="_blank"
        rel="noopener noreferrer"
        class="project-card"
      >
        <div class="card-content">
          <div class="card-header">
            <h3 class="project-name">{{ project.name }}</h3>
            <span v-if="project.level" class="level-tag" :class="'level-' + project.level">{{ project.level }}</span>
          </div>
          <p class="project-desc">{{ project.description }}</p>
        </div>
        <div class="project-tags">
          <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>
      </a>
    </div>
  </div>
</template>

<style scoped>
.project-section {
  margin: 28px 0;
}

.section-title {
  font-size: 20px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 16px;
  padding-bottom: 10px;
  border-bottom: 2px solid var(--vp-c-brand-1);
}

.project-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
}

@media (max-width: 1200px) {
  .project-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 900px) {
  .project-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .project-grid {
    grid-template-columns: 1fr;
  }
}

.project-card {
  display: flex;
  flex-direction: column;
  padding: 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  transition: all 0.2s ease;
  text-decoration: none;
  color: inherit;
  height: 160px;
}

.project-card:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.06);
}

.card-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.project-name {
  font-size: 15px;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  margin: 0;
  line-height: 1.3;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.level-tag {
  display: inline-block;
  padding: 1px 6px;
  border-radius: 3px;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.5px;
  white-space: nowrap;
  flex-shrink: 0;
}

.level-入门 {
  background: linear-gradient(135deg, #667eea22, #764ba222);
  color: #667eea;
  border: 1px solid #667eea44;
}

.level-进阶 {
  background: linear-gradient(135deg, #f093fb22, #f5576c22);
  color: #f5576c;
  border: 1px solid #f5576c44;
}

.level-高级 {
  background: linear-gradient(135deg, #4facfe22, #00f2fe22);
  color: #00b4d8;
  border: 1px solid #00b4d844;
}

.level-实战 {
  background: linear-gradient(135deg, #fa709a22, #fee14022);
  color: #e85d04;
  border: 1px solid #e85d0444;
}

.project-desc {
  font-size: 12px;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  margin: 0;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: auto;
  padding-top: 10px;
  border-top: 1px dashed var(--vp-c-divider);
}

.tag {
  display: inline-block;
  padding: 2px 8px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  border-radius: 3px;
  font-size: 11px;
}
</style>

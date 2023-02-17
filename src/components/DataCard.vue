<template>
  <article class="card">
    <div class="header">
      <h4>{{ title }}</h4>
      <router-link v-if="link.path && link.label" :to="link.path">
        {{ link.label }}
      </router-link>
    </div>
    <div class="body">
      <ul>
        <li v-for="(attribute, index) in itemAttributes" :key="index">
          <span>{{ attribute.label }}</span>
          <strong>{{ formatNumber(attribute.value) }}</strong>
        </li>
      </ul>
    </div>
  </article>
</template>

<script lang="ts">
import { prop, mixins } from 'vue-class-component'
import { WithFormatData } from '@/mixins'
import type { DataCardAttributeType } from '@/types'

export default class DataCard extends mixins(WithFormatData).with(class {
  itemAttributes = prop<DataCardAttributeType[]>({ default: [] })
  title = prop<string>({ default: ''})
  link = prop<{
    label: string,
    path: string
  }>({ default: {}})
}) {
}
</script>

<style scoped>
.card {
  border: 2px solid var(--table-tbody-border-color);
}
.header {
  align-items: center;
  background: var(--heading-background-color);
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 1rem;
}

.body {
  padding: 1rem;
}

ul {
  margin: 0;
  padding: 0
}

li {
  display: flex;
  justify-content: space-between;
  list-style-type: none;
  margin-bottom: 20px;
  padding: 0;
}

li:last-child {
  margin-bottom: 0;
}
</style>

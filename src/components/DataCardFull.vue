<template>
  <article>
    <div class="header">
      <h3>{{ title }}</h3>
    </div>
    <DataTable :data="[summaryData]"/>
    <div v-if="lastUpdate" class="last-update">{{ lastUpdate }}</div>
    <ul v-if="links && links.length" class="inline-block">
      <li v-for="(link, index) of links.filter(link => link.path)" :key="index">
        <NavigationLink v-bind="{ ...link }" />
      </li>
    </ul>
    <div v-markdown="info" class="info"/>
  </article>
</template>

<script lang="ts">
import { Options, prop, Vue } from 'vue-class-component'
import DataTable from '@/components/DataTable.vue'
import NavigationLink from '@/components/NavigationLink.vue'
import type { DataCardAttributeType, Link } from '@/types'

@Options ({
  components: {
    DataTable,
    NavigationLink,
  }
})
export default class DataCardFull extends Vue.with(class {
  title = prop<string>({ default: ''})
  info = prop<string>({ default: ''})
  lastUpdate = prop<string>({ default: ''})
  links = prop<Link[]>({ default: []})
  summaryData = prop<Array<DataCardAttributeType[]>>({ default: [] })
}) {
}
</script>

<style scoped>
.header,
.info,
.last-update,
:deep(th),
:deep(td) {
  text-align: left;
}

.last-update {
  padding-top: 15px;
}

:deep(th) {
  padding-top: 0;
}

:deep(thead tr:nth-child(2) th) {
  font-size: 12px;
}

:deep(thead tr:nth-child(2) th:first-child) {
  visibility: hidden;
}

@media (min-width: 1024px) {
  h3 {
    font-size: 30px;
  }
}
</style>

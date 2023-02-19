<template>
  <article>
    <div class="header">
      <h3>{{ title }}</h3>
    </div>
    <DataTable :data="[summaryData]"/>
    <div v-markdown="info" class="info"/>
  </article>
</template>

<script lang="ts">
import { Options, prop, Vue } from 'vue-class-component'
import DataTable from '@/components/DataTable.vue'
import type { DataCardAttributeType } from '@/types'

@Options ({
  components: {
    DataTable,
  }
})
export default class DataCardFull extends Vue.with(class {
  title = prop<string>({ default: ''})
  info = prop<string>({ default: ''})
  summaryData = prop<Array<DataCardAttributeType[]>>({ default: [] })
}) {
}
</script>

<style scoped>
.header,
.info,
:deep(th),
:deep(td) {
  text-align: left;
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

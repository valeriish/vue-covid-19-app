<template>
  <table v-if="data.length">
    <thead>
      <tr>
        <th v-for="(item, index) of data[0]" :key="index">{{ item.label }}</th>
      </tr>
    </thead>
    <tbody>
      <DataTableRow v-for="(item, index) of data" :row="item" :key="index" />
    </tbody>
  </table>
</template>

<script lang="ts">
import { Options, prop, Vue } from 'vue-class-component'
import type { DataCardAttributeType } from '@/types'
import DataTableRow from './DataTableRow.vue';

@Options ({
  components: {
    DataTableRow,
  }
})
export default class DataTable extends Vue.with(class {
  data = prop<Array<DataCardAttributeType[]>>({ default: [] })
}) {
}
</script>

<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
}

thead {
  border-bottom: 1px solid var(--table-thead-border-color);
}

th,
td {
  text-align: right;
}

th {
  line-height: 1.15;
  min-width: 5em;
  padding: 2rem 0.5rem 0.5rem;
  position: relative;
  vertical-align: bottom;
}
</style>

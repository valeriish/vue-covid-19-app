<template>
  <table v-if="data.length">
    <colgroup
      v-for="(item, index) of colgroup()"
      :key="index"
      :class="index + 1 === colgroup().length ? 'last' : ''">
      <col :span="item.childItems"/>
    </colgroup>
    <thead>
      <tr>
        <th
          v-for="(item, index) of colgroup()"
          :key="index"
          :colspan="item.childItems">
          {{ item.label }}
        </th>
      </tr>
      <tr>
        <th
          v-for="(item, index) of data[0].filter(item => !item.childItems)"
          :key="index">
          {{ item.label }}
        </th>
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
import DataTableRow from '@/components/DataTableRow.vue'

@Options ({
  components: {
    DataTableRow,
  }
})
export default class DataTable extends Vue.with(class {
  data = prop<Array<DataCardAttributeType[]>>({ default: [] })
}) {
  colgroup() {
    return this.data[0].filter(item => item.childItems)
  }
}
</script>

<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
}

colgroup {
  border-right: 1px solid var(--table-thead-border-color);
}

colgroup.last {
  border-right: none;
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

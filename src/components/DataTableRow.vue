<template>
  <tr>
    <td v-for="(attribute, index) in row.filter(item => !item.childItems)" :key="index">
      {{
      attribute.isNumber
        ? formatNumber(attribute.value)
        : attribute.isDate ? formatDate(attribute.value) : attribute.value
      }}
    </td>
  </tr>
</template>

<script lang="ts">
import { prop, mixins } from 'vue-class-component'
import { WithFormatData } from '@/mixins'
import type { DataCardAttributeType } from '@/types'

export default class DataTableRow extends mixins(WithFormatData).with(class {
  row = prop<DataCardAttributeType[]>({ default: [] })
}) {
}
</script>

<style scoped>
tr:hover {
    background-color: var(--table-hover-background-color);
}

td {
  border-bottom: 1px solid var(--table-tbody-border-color);
  text-align: right;
  padding: 1rem 0.5rem;
}
</style>

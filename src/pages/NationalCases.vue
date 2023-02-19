<template>
  <h1 class="title">Case History</h1>
  <DataTable v-if="!ctx.error" :data="casesData()"/>
</template>

<script lang="ts">
import { Options, mixins } from 'vue-class-component'
import { WithDailyData } from '@/mixins'
import DataTable from '@/components/DataTable.vue'

@Options({
  components: {
    DataTable,
  }
})
export default class NationalCases extends mixins(WithDailyData) {
}
</script>

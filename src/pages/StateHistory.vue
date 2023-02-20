<template>
  <h1 class="title">Historic values for the {{ ctx.stateName }} state</h1>
  <DataTable v-if="!ctx.error" :data="ctx.stateData"/>
</template>

<script lang="ts">
import { Options, mixins } from 'vue-class-component'
import DataTable from '@/components/DataTable.vue'
import { WithStatesHistory } from '@/mixins'

@Options({
  components: {
    DataTable,
  }
})
export default class NationalCases extends mixins(WithStatesHistory) {
}
</script>

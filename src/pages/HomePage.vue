<template>
  <DailySummary />
  <div class="wrapper">
    <h2>Data By State</h2>
    <DataCardFull
      v-for="(state, index) of statesData()"
      v-bind="{
        ...state,
        title: state.name,
        info: state.notes,
        
      }"
      :key="index"/>
  </div>
</template>

<script lang="ts">
import { Options, mixins } from 'vue-class-component'
import DailySummary from '@/components/DailySummary.vue'
import DataCardFull from '@/components/DataCardFull.vue'
import { WithStatesInfo } from '@/mixins/with-states-data';

@Options({
  components: {
    DailySummary,
    DataCardFull,
  },
})
export default class HomePage extends mixins(WithStatesInfo) {
}
</script>

<style scoped>
  h2 {
    border-bottom: 1px solid var(--table-tbody-border-color);
    margin-bottom: 2rem;
    margin-top: 30px;
    line-height: 1;
    padding-bottom: 1.5rem;
    padding-top: 0.25rem;
    text-align: left;
  }
</style>

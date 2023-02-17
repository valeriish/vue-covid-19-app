<template>
  <div v-if="!ctx.error">
    <h3>Data for {{ formatDate(ctx.date) }}</h3>
    <div class="wrapper" role="list" aria-label="Daily Summary">
      <DataCard
        title="Cases"
        :link="{ label: 'Historical data', path: 'cases' }"
        :item-attributes="ctx.casesData"
        role="listitem"
      />
      <DataCard
        title="Tests"
        :link="{ label: 'Historical data', path: 'tests' }"
        :item-attributes="ctx.testsData"
        role="listitem"
      />
      <DataCard
        title="Hospitalization"
        :link="{ label: 'Historical data', path: 'hospitalization' }"
        :item-attributes="ctx.hospitalizationData"
        role="listitem"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { mixins, Options } from 'vue-class-component'
import { WithFormatData, WithSummaryData } from '@/mixins'
import DataCard from '@/components/DataCard.vue'

@Options({
  components: {
    DataCard,
  },
})
export default class DailySummary extends mixins(WithFormatData, WithSummaryData) {
}
</script>

<style scoped>
.wrapper {
  display: grid;
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
  grid-template-columns: repeat(1,1fr);
  margin-top: 2rem;
}

@media (min-width: 640px) {
  .wrapper {
    grid-template-columns: repeat(2,1fr);
  }
}

@media (min-width: 1024px) {
  .wrapper {
    grid-template-columns: repeat(3,1fr);
  }
}
</style>

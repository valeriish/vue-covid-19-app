<template>
  <DailySummary />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import DailySummary from '@/components/DailySummary.vue'

@Options({
  components: {
    DailySummary,
  },
})
export default class HomePage extends Vue {
}
</script>

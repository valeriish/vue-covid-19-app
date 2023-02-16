import { Vue, setup } from 'vue-class-component'
import { useSummary } from '@/composable'

/**
 * Add Daily Summary Data to Component
 */
export class WithSummaryData extends Vue {
  ctx = setup(() => {
    const {
      date,
      casesData,
      testsData,
      hospitalizationData,
      error
    } = useSummary()

    return {
      date,
      casesData,
      testsData,
      hospitalizationData,
      error
    }
  })
}

import { Vue, setup } from 'vue-class-component'
import { useDailyData } from '@/composable'

/**
 * Add Daily History Data to Component
 */
export class WithDailyData extends Vue {
  ctx = setup(() => {
    const {
      casesData,
      testsData,
      hospitalizationData,
      error
    } = useDailyData()

    return {
      casesData,
      testsData,
      hospitalizationData,
      error
    }
  })
}

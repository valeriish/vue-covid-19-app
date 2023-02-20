import { Vue, setup } from 'vue-class-component'
import { useSummary } from '@/composable'
import type { Ref } from 'vue'
import type { UnwrapSetupValue } from 'vue-class-component'
import type { DataCardAttributeType } from '@/types'

/**
 * Add Daily Summary Data to Component
 */
export class WithSummaryData extends Vue {
  ctx: UnwrapSetupValue<{
    date: Ref<string | null>,
    casesData: Ref<DataCardAttributeType[]>,
    testsData: Ref<DataCardAttributeType[]>,
    hospitalizationData: Ref<DataCardAttributeType[]>,
    error: string | null
  }> = setup(() => {
    const {
      date,
      casesData,
      testsData,
      hospitalizationData,
      error,
    } = useSummary()

    return {
      date,
      casesData,
      testsData,
      hospitalizationData,
      error,
    }
  })
}

import { computed } from 'vue'
import { Vue, setup } from 'vue-class-component'
import { useConfig, useStates } from '@/composable'
import { getMatchedData } from '@/helper'

/**
 * Add States Info to Component
 */
export class WithStatesInfo extends Vue {
  ctx = setup(() => {
    const {
      statesData,
      error
    } = useStates()

    const config = useConfig()
    const { schema } = config.value

    let statesInfo = [] as any

    if (schema && schema.statesSummary) {
      statesInfo = computed(() => {
        statesData.value.forEach((state, index) => {
          statesData.value[index].summaryData = getMatchedData(state, schema.statesSummary)
        })
        return statesData.value
      })
    }

    return {
      statesInfo,
      error
    }
  })
}

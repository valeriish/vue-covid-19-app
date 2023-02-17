import { ref } from 'vue'
import type { Ref } from 'vue'
import { createGlobalState } from '@vueuse/core'

import { useConfig } from '@/composable'
import { getMatchedData } from '@/helper'
import type { DataCardAttributeType } from '@/types'

/**
 * Store and return Daily History Data
 */
export const useDailyData = createGlobalState(
  () => {
    const error: Ref<string | null> = ref(null)
    const casesData: Ref<Array<DataCardAttributeType[]>> = ref([])
    const testsData: Ref<Array<DataCardAttributeType[]>> = ref([])
    const hospitalizationData: Ref<Array<DataCardAttributeType[]>> = ref([])

    const config = useConfig()
    const { resources, schema } = config.value
    if (resources && schema && resources.getDailyDataEndpoint) {
      fetch(resources.getDailyDataEndpoint)
        .then((res) => res.json())
        .then((json) => {
          if (!json.dailyData || json.dailyData.length === 0) {
            throw new Error("Couldn't load daily data")
          }
          if (schema.history) {
            for (const dailyReport of json.dailyData) {
              casesData.value.push(
                getMatchedData(dailyReport, schema.history.dailyCases)
              )

              testsData.value.push(
                getMatchedData(dailyReport, schema.history.dailyTest)
              )

              hospitalizationData.value.push(
                getMatchedData(dailyReport, schema.history.dailyHospitalization)
              )
            }
          }
        })
        .catch((err) => (error.value = err))
    }

    return {
      casesData,
      testsData,
      hospitalizationData,
      error
    }
  }
)

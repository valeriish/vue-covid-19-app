import { ref } from 'vue'
import type { Ref } from 'vue'
import { createGlobalState } from '@vueuse/core'

import { useConfig } from '@/composable'
import { getMatchedData } from '@/helper'
import type { DataCardAttributeType } from '@/types'

/**
 * Store and return Daily Sammary Data
 */
export const useSummary = createGlobalState(
  () => {
    const date: Ref<string | null> = ref(null)
    const error: Ref<string | null> = ref(null)
    const casesData: Ref<DataCardAttributeType[]> = ref([])
    const testsData: Ref<DataCardAttributeType[]> = ref([])
    const hospitalizationData: Ref<DataCardAttributeType[]> = ref([])


    const config = useConfig()
    const { resources, schema } = config.value

    if (resources && schema && resources.getSummaryEndpoint) {
      fetch(resources.getSummaryEndpoint)
        .then((res) => res.json())
        .then((json) => {
          if (!json.summary || Object.keys(json.summary).length === 0) {
            throw new Error("Couldn't load daily data")
          }
          date.value = json.summary.date
          if (schema.summary) {
            casesData.value = getMatchedData(json.summary, schema.summary.dailyCases)
            testsData.value = getMatchedData(json.summary, schema.summary.dailyTest)
            hospitalizationData.value = getMatchedData(json.summary, schema.summary.dailyHospitalization)
          }
        })
        .catch((err) => (error.value = err))
    }

    return {
      date,
      casesData,
      testsData,
      hospitalizationData,
      error
    }
  }
)

import { ref } from 'vue'
import type { Ref } from 'vue'
import { createGlobalState } from '@vueuse/core'

import { useConfig } from '@/composable'
import type { DataCardAttributeType } from '@/types'

/**
 * Store and return Daily History Data
 */
export const useDailyData = createGlobalState(
  () => {
    const error: Ref<string | null> = ref(null)
    const dailyData: Ref<DataCardAttributeType[][]> = ref([])

    const config = useConfig()
    const { resources, schema } = config.value
    if (resources && schema && resources.getDailyDataEndpoint) {
      fetch(resources.getDailyDataEndpoint)
        .then((res) => res.json())
        .then((json) => {
          if (!json.dailyData || json.dailyData.length === 0) {
            throw new Error("Couldn't load daily data")
          }
          if (schema.history && schema.history.includeFields) {
            const includeKeys = new Set(schema.history.includeFields)
            for (const dailyInfo of json.dailyData) {
              const filteredPairs = Object.entries(dailyInfo).filter(([ key ]) => includeKeys.has(key))
              dailyData.value.push(Object.fromEntries(filteredPairs) as any)
            }
          }
        })
        .catch((err) => (error.value = err))
    }

    return {
      dailyData,
      error
    }
  }
)

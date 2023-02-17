import { ref } from 'vue'
import type { Ref } from 'vue'
import { createGlobalState } from '@vueuse/core'

import { useConfig } from '@/composable'

/**
 * Store and return State Data
 */
export const useStates = createGlobalState(
  () => {
    const error: Ref<string | null> = ref(null)
    const statesData: Ref<any[]> = ref([])

    const config = useConfig()
    const { resources, schema } = config.value

    if (resources && schema && resources.getStatesDataEndpoint) {
      fetch(resources.getStatesDataEndpoint)
        .then((res) => res.json())
        .then((json) => {
          if (!json.statesInfo || json.statesInfo.length === 0) {
            throw new Error("Couldn't load states data")
          }
          if (schema.statesInfo && schema.statesInfo.includeFields) {
            const includeKeys = new Set(schema.statesInfo.includeFields)
            for (const stateInfo of json.statesInfo) {
              if (schema.statesInfo.includeFields) {
                const filteredPairs = Object.entries(stateInfo).filter(([ key ]) => includeKeys.has(key));
                statesData.value.push(Object.fromEntries(filteredPairs))
              }
            }
          }
        })
        .catch((err) => (error.value = err))
    }

    return {
      statesData,
      error
    }
  }
)

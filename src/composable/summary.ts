import { ref } from 'vue'
import type { Ref } from 'vue'
import { createGlobalState } from '@vueuse/core'

import { useConfig } from '@/composable'
import type { DataCardAttributeType } from '@/types'

/**
 * Store and return Daily Sammary Data
 */
export const useSummary = createGlobalState(
  () => {
    const data = ref(null)
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
          data.value = json
          if (!json.summary || Object.keys(json.summary).length === 0) {
            throw new Error("Couldn't load daily data")
          }
          date.value = json.summary.date
          if (schema.summary) {
            if (schema.summary.dailyCases
              && schema.summary.dailyCases.length
            ) {
              for (const attribute of schema.summary.dailyCases) {
                const attr:DataCardAttributeType = {
                  label: attribute.label,
                  value: json.summary[attribute.key],
                  isNumber: true
                }
                casesData.value.push(attr)
              }
            }

            if (schema.summary.dailyTest
              && schema.summary.dailyTest.length
            ) {
              for (const attribute of schema.summary.dailyTest) {
                const attr:DataCardAttributeType = {
                  label: attribute.label,
                  value: json.summary[attribute.key],
                  isNumber: true
                }
                testsData.value.push(attr)
              }
            }

            if (schema.summary.dailyHospitalization
              && schema.summary.dailyHospitalization.length
            ) {
              for (const attribute of schema.summary.dailyHospitalization) {
                const attr:DataCardAttributeType = {
                  label: attribute.label,
                  value: json.summary[attribute.key],
                  isNumber: true
                }
                hospitalizationData.value.push(attr)
              }
            }
          }
        })
        .catch((err) => (error.value = err))
    }

    return {
      data,
      date,
      casesData,
      testsData,
      hospitalizationData,
      error
    }
  }
)

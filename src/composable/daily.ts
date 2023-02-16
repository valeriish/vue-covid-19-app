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
    const data = ref(null)
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
          data.value = json
          if (!json.summary || Object.keys(json.summary).length === 0) {
            throw new Error("Couldn't load daily data")
          }
          if (schema.history) {
            for (const dailyReport of json.summary) {
              if (schema.history.dailyCases
                && schema.history.dailyCases.length
              ) {
                const dailyData = []
                for (const attribute of schema.history.dailyCases) {
                  const attr:DataCardAttributeType = {
                    label: attribute.label,
                    value: dailyReport[attribute.key],
                    isNumber: attribute.key !== 'date',
                    isDate: attribute.key === 'date'
                  }
                  dailyData.push(attr)
                }

                casesData.value.push(dailyData)
              }

              if (schema.history.dailyTest
                && schema.history.dailyTest.length
              ) {
                const dailyData = []
                for (const attribute of schema.history.dailyTest) {
                  const attr:DataCardAttributeType = {
                    label: attribute.label,
                    value: dailyReport[attribute.key],
                    isNumber: attribute.key !== 'date',
                    isDate: attribute.key === 'date'
                  }
                  dailyData.push(attr)
                }

                testsData.value.push(dailyData)
              }

              if (schema.history.dailyHospitalization
                && schema.history.dailyHospitalization.length
              ) {
                const dailyData = []
                for (const attribute of schema.history.dailyHospitalization) {
                  const attr:DataCardAttributeType = {
                    label: attribute.label,
                    value: dailyReport[attribute.key],
                    isNumber: attribute.key !== 'date',
                    isDate: attribute.key === 'date'
                  }
                  dailyData.push(attr)
                }

                hospitalizationData.value.push(dailyData)
              }
            }
          }
        })
        .catch((err) => (error.value = err))
    }

    return {
      data,
      casesData,
      testsData,
      hospitalizationData,
      error
    }
  }
)

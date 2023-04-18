import { ref } from 'vue'
import type { Ref } from 'vue'

import { useConfig } from '@/composable'
import { fetchData } from '@/helper'
import type { DataCardAttributeType } from '@/types'

const dailyData: Ref<DataCardAttributeType[][]> = ref([])

/**
 * Store and return Daily History Data
 */
export const useDailyData = () => {
  const config = useConfig()
  const error: Ref<string | null> = ref(null)

  const load = async () => {
    const data = await fetchData(config)

    return data
  }
  
  function setData(data: DataCardAttributeType[][]): void {
    dailyData.value = data
  }

  if (dailyData.value.length === 0) {
    load().then(data => {
      setData(data)
    })
  }

  return {
    dailyData,
    error,
    load,
    setData,
  }
}

import { ref } from 'vue'
import type { Ref } from 'vue'

import { fetchData } from '@/helper'
import { useConfig } from '@/composable'
import type { StateInfoType } from '@/types'

const statesData: Ref<StateInfoType[]> = ref([])
const DATA_TYPE = 'statesInfo'

/**
 * Store and return State Data
 */
export const useStates = () => {
  const error: Ref<string | null> = ref(null)
  const statesData: Ref<StateInfoType[]> = ref([])

  const config = useConfig()

  const load = async () => {
    const data = await fetchData<StateInfoType>(config, DATA_TYPE)

    return data
  }

  function setData(data: StateInfoType[]): void {
    statesData.value = data
  }

  if (statesData.value.length === 0) {
    load().then(data => {
      setData(data)
    })
  }

  return {
    statesData,
    error,
    load,
    setData,
    DATA_TYPE,
  }
}

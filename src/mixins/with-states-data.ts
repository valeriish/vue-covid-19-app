import { onErrorCaptured, onServerPrefetch, useSSRContext } from 'vue'
import { Vue, setup } from 'vue-class-component'
import { useConfig, useStates } from '@/composable'
import { getMatchedData } from '@/helper'
import type { Ref } from 'vue'
import type { UnwrapSetupValue } from 'vue-class-component'
import type { SchemaType, ConfigType, StateInfoType } from '@/types'

/**
 * Add States Info to Component
 */
export class WithStatesInfo extends Vue {
  ctx: UnwrapSetupValue<{
    statesData: Ref<StateInfoType[]>,
    schema: SchemaType | null,
    error: any,
  }> = setup(() => {
    const {
      statesData,
      error,
      load,
      setData,
      DATA_TYPE,
    } = useStates()
    const config: Ref<ConfigType> = useConfig()
    const schema: SchemaType | null  = config.value.schema

    onErrorCaptured((error: Error) => {
      console.log('Something went wrong: ' + error.toString())

      return false
    })

    onServerPrefetch(async () => {
      const { load } = useStates()
      const ctx = useSSRContext()
      const data = await load()
      setData(data)
      if (ctx) {
        console.log(data)
        ctx.state[DATA_TYPE] = data
      }
    })

    return {
      statesData,
      schema,
      error,
    }
  })

  /**
   * Get State Current Data
   */
  statesData(): StateInfoType[] {
    const statesData: StateInfoType[] = []
    if (this.ctx.schema && this.ctx.schema.statesInfo) {
      for (const stateData of this.ctx.statesData) {
        statesData.push({
          ...stateData,
          ...{
            summaryData: getMatchedData(stateData, this.ctx.schema.statesInfo.data)
          } as StateInfoType
        })
      }
    }

    return statesData
  }
}

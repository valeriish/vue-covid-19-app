import { computed, onErrorCaptured } from 'vue'
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
    error: any
  }> = setup(() => {
    const {
      statesData,
      error
    } = useStates()
    const config: Ref<ConfigType> = useConfig()
    const schema: SchemaType | null  = config.value.schema

    onErrorCaptured((error: Error) => {
      console.log('Something went wrong: ' + error.toString())

      return false
    })

    return {
      statesData,
      schema,
      error
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
            summaryData: getMatchedData(stateData, this.ctx.schema.statesInfo.summary)
          } as StateInfoType
        })
      }
    }

    return statesData
  }
}

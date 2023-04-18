import { onErrorCaptured, onServerPrefetch, useSSRContext } from 'vue'
import { Vue, setup } from 'vue-class-component'
import { useConfig, useDailyData } from '@/composable'
import { getMatchedData } from '@/helper'
import type { Ref } from 'vue'
import type { UnwrapSetupValue } from 'vue-class-component'
import type { DataCardAttributeType, SchemaType, ConfigType } from '@/types'

/**
 * Add Daily History Data to Component
 */
export class WithDailyData extends Vue {
  ctx: UnwrapSetupValue<{
    dailyData: Ref<DataCardAttributeType[][]>,
    schema: SchemaType | null,
    error: any
  }> = setup(() => {
    const {
      dailyData,
      error,
      load,
      setData,
    } = useDailyData()

    const config: Ref<ConfigType> = useConfig()
    const schema: SchemaType | null  = config.value.schema

    onErrorCaptured((error: Error) => {
      console.log('Something went wrong: ' + error.toString())

      return false
    })

    onServerPrefetch(async () => {
      const { load } = useDailyData()
      const ctx = useSSRContext()
      const data = await load()
      setData(data)
      if (ctx) {
        ctx.state.push({ daily: data })
      }
    })
    

    return {
      dailyData,
      schema,
      error,
    }
  })

  /**
   * Get Case History
   */
  casesData(): DataCardAttributeType[][] {
    const casesData = []
    if (this.ctx.schema && this.ctx.schema.history) {
      for (const dailyReport of this.ctx.dailyData) {
        casesData.push(
          getMatchedData(dailyReport, this.ctx.schema.history.dailyCases)
        )
      }
    }

    return casesData
  }

  /**
   * Get Test History
   */
  testsData(): DataCardAttributeType[][] {
    const testsData = []
    if (this.ctx.schema && this.ctx.schema.history) {
      for (const dailyReport of this.ctx.dailyData) {
        testsData.push(
          getMatchedData(dailyReport, this.ctx.schema.history.dailyTest)
        )
      }
    }

    return testsData
  }

  /**
   * Get Hospitalization History
   */
  hospitalizationData(): DataCardAttributeType[][] {
    const hospitalizationData = []
    if (this.ctx.schema && this.ctx.schema.history) {
      for (const dailyReport of this.ctx.dailyData) {
        hospitalizationData.push(
          getMatchedData(dailyReport, this.ctx.schema.history.dailyHospitalization)
        )
      }
    }

    return hospitalizationData
  }
}

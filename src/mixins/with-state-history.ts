import { onErrorCaptured, ref } from 'vue'
import { Vue, setup, prop } from 'vue-class-component'
import { useConfig } from '@/composable'
import { getMatchedData } from '@/helper'
import type { Ref } from 'vue'
import type { UnwrapSetupValue } from 'vue-class-component'
import type { SchemaType, ConfigType, DataCardAttributeType, ConfigField } from '@/types'

/**
 * Add State History to Component
 */
export class WithStatesHistory extends Vue.with(
  class {
    state = prop<string>({default: ''})
  }
) {
  ctx: UnwrapSetupValue<{
    stateName: Ref<string | null>,
    stateData: Ref<DataCardAttributeType[][]>,
    resources: ConfigField | null,
    schema: SchemaType | null,
    error: string | null,
  }> = setup(() => {
    const stateName: Ref<string | null> = ref(null)
    const stateData: Ref<DataCardAttributeType[][]> = ref([])
    const config: Ref<ConfigType> = useConfig()
    const error: Ref<string | null> = ref(null)
    const { resources, schema } = config.value

    onErrorCaptured((error: Error) => {
      console.log('Something went wrong: ' + error.toString())

      return false
    })

    return {
      stateName,
      stateData,
      resources,
      schema,
      error,
    }
  })

  mounted() {
    const { resources, schema, stateData } = this.ctx
    if (
      this.state
      && resources
      && resources.getStateDataEndpoint
    ) {
      fetch(resources.getStateDataEndpoint.replace('{state}', this.state))
        .then((res) => res.json())
        .then((json) => {
          if (json.stateinfo.name) {
            this.ctx.stateName = json.stateinfo.name
          }
          if (schema && schema.stateHistory && schema.stateHistory.data) {
            for (const stateHistory of json.historicalData) {
              stateData.push(
                getMatchedData(stateHistory, schema.stateHistory.data)
              )
            }
          }
        })
        .catch((err) => {
          this.ctx.error = err
          console.log(err)
        })
    }
  }
}

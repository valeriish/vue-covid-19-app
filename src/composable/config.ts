import { ref, getCurrentInstance } from 'vue'
import { createGlobalState } from '@vueuse/core'
import type { Ref } from 'vue'
import type { ConfigType } from '@/types'

/**
 * Store and return Global Application Configuration
 */
export const useConfig = createGlobalState(
  () => {
    const config: Ref<ConfigType> = ref({
      resources: null,
      schema: null
    })

    const root = getCurrentInstance()

    if (root) {
      const { appContext: { config: { globalProperties : { appConfig } } } }
        = root as any

      if (appConfig) {
        config.value = {
          resources: appConfig.resources || null,
          schema: appConfig.schema || null,
        }
      } else {
        throw new Error('Config is not accessabale')
      }
    }

    return config
  }
)

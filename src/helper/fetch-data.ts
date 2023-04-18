import type { Ref } from 'vue'
import type { ConfigType, DataCardAttributeType } from '@/types'

const isSSR = typeof window === 'undefined'

export default function (
  config: Ref<ConfigType>
): Promise<DataCardAttributeType[][]> {
  const { resources, schema } = config.value
  const dailyData: DataCardAttributeType[][] = []

  if (resources && schema && resources.getDailyDataEndpoint) {
    const host = isSSR ?
      `${resources.serverHostname}:${resources.serverPort}`
      : ''

    return fetch(`${host}${resources.getDailyDataEndpoint}`)
      .then((res) => res.json())
      .then((json) => {
        if (!json.dailyData || json.dailyData.length === 0) {
          return dailyData
        }
        if (schema.history && schema.history.includeFields) {
          const includeKeys = new Set(schema.history.includeFields)
          for (const dailyInfo of json.dailyData) {
            const filteredPairs = Object.entries(dailyInfo).filter(([ key ]) => includeKeys.has(key))
            dailyData.push(Object.fromEntries(filteredPairs) as any)
          }
        }

        return dailyData
      })
  }

  return new Promise(resolve => resolve(dailyData))
}

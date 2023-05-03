import type { Ref } from 'vue'
import type { ConfigType, DataWindow } from '@/types'

const isSSR = typeof window === 'undefined'
declare let window: DataWindow

/**
 * Get Data from remote source or stored INITIAL_DATA
 * 
 * @param {ConfigType} config 
 * @param {string} type 
 * @returns {Promise}
 */
export default function <T> (
  config: Ref<ConfigType>,
  type: string = 'dailyData'
): Promise<T[]> {
  const { resources, schema } = config.value
  let data: T[] = []

  if (
    !isSSR
    && type
    && typeof window['INITIAL_DATA'] === 'object'
    && Object.keys(window.INITIAL_DATA).includes(type)
  ) {
    data = window.INITIAL_DATA[type] as T[]
  }

  if (
    data.length === 0
    && resources
    && schema
    && resources.getEndpoint[type]
  ) {
    const host = isSSR ?
      `${resources.serverHostname}:${resources.serverPort}`
      : ''

    return fetch(`${host}${resources.getEndpoint[type]}`)
      .then((res) => res.json())
      .then((json) => {
        if (!json[type] || json[type].length === 0) {
          return data
        }
        if (schema[type] && schema[type].includeFields) {
          const includeKeys = new Set(schema[type].includeFields)
          for (const item of json[type]) {
            const filteredPairs = Object.entries(item).filter(([ key ]) => includeKeys.has(key))
            data.push(Object.fromEntries(filteredPairs) as any)
          }
        }

        return data
      })
  }

  return new Promise(resolve => resolve(data))
}

import type { DataCardAttributeType, SchemaItemType } from '@/types'

export function getMatchedData(data: any, schema: SchemaItemType[]): DataCardAttributeType[] {
  const result: DataCardAttributeType[] = []

  for (const attribute of schema) {
    if (!Array.isArray(attribute.key)) {
      const attr: DataCardAttributeType = {
        label: attribute.label,
        value: data[attribute.key],
        isNumber: attribute.isNumber !== false,
        isDate: attribute.isDate === true
      }
      result.push(attr)
    }
  }

  return result
}

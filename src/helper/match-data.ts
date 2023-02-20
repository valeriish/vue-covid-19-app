import type { DataCardAttributeType, SchemaItemType } from '@/types'

function getAttribute (
  data: any,
  schemaItem: SchemaItemType,
): DataCardAttributeType {
  return {
    label: schemaItem.label as string,
    value: data[schemaItem.key as string],
    isNumber: schemaItem.isDate !== 'true' && schemaItem.isNumber !== 'false',
    isDate: schemaItem.isDate === 'true',
  }
}

export function getMatchedData (
  data: any,
  schema: SchemaItemType[],
): DataCardAttributeType[] {
  let result: DataCardAttributeType[] = []

  for (const attribute of schema) {
    if (!Array.isArray(attribute.key)) {
      result.push(getAttribute(data, attribute))
    } else {
      const itemParent = {
        label: attribute.label as string,
        value: '',
        childItems: attribute.key.length,
      }
      result.push(itemParent)
      result = result.concat(getMatchedData(data, attribute.key))
    }
  }

  return result
}

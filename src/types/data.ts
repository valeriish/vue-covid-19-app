export interface DataCardAttributeType {
  label: string,
  value: string,
  isNumber?: boolean,
  isDate?: boolean,
}

export interface SchemaItemType {
  label: string,
  key: SchemaItemType[] | string,
  isNumber?: boolean,
  isDate?: boolean,
}

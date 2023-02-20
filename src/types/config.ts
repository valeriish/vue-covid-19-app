
export interface SchemaItemType {
  label?: string,
  key?: SchemaItemType[] | string,
  isNumber?: string,
  isDate?: string,
  
}

export interface SchemaType {
  [key: string]: {
    includeFields?: any,
    [key: string]: SchemaItemType[],
  }
}

export interface ConfigField {
  [key: string]: any
}

export interface ConfigType {
  resources: ConfigField | null,
  schema: SchemaType | null
}

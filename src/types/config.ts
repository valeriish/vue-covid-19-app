
export interface SchemaItemType {
  label?: string,
  key?: SchemaItemType[] | string,
  isNumber?: boolean,
  isDate?: boolean,
  
}

export interface SchemaType {
  [key: string]: {
    includeFields?: any,
    [key: string]: SchemaItemType[],
  }
}

interface ConfigField {
  [key: string]: any
}

export interface ConfigType {
  resources: ConfigField | null,
  schema: SchemaType | null
}

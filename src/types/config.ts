interface configField {
  [key: string]: any
}

export interface ConfigType {
  resources: configField | null,
  schema: configField | null
}

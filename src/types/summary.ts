export interface DataCardAttributeType {
  label: string,
  value: string,
  isNumber?: boolean,
  isDate?: boolean
}

export interface DataCardType {
  title: string,
  link?: {
    path?: string,
    label?: string
  },
  attributes: DataCardAttributeType[]
}

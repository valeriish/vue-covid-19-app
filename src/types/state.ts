import { DataCardAttributeType } from '@/types'

export interface StateInfoType {
  [key: string]: string | DataCardAttributeType[],
}

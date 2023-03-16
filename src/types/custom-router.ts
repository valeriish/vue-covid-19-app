import type { Router } from 'vue-router'

interface CustomRouter extends Router {
  meta: {
    title?: string
  },
  getMetaData: Function
}

export default CustomRouter

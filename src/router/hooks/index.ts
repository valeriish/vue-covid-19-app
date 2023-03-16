import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
import type { CustomRouter } from '@/types'

import beforeEach from './before-each'

export default function (router: CustomRouter): CustomRouter {
  router.beforeEach((
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    return beforeEach(router, to, from, next)
  })

  return router
}

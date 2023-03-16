import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
import type { CustomRouter } from '@/types'

const isSSR = typeof window === 'undefined'

export default function(
  router: CustomRouter,
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  let title = ''

  if (to.meta && to.meta.title) {
    title = to.meta.title as string
  }

  if (title) {
    if (isSSR) {
      //const ssrContext = useSSRContext() as any
      //ssrContext.req.title = title
      router.meta.title = title
    } else {
      document.title = title
    }
  }

  next()
}

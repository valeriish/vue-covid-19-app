import { createRouter, createMemoryHistory, createWebHistory, Router } from 'vue-router'
import hooks from './hooks'
import type { CustomRouter } from '@/types'

const isSSR = process.env.VUE_APP_SSR || false
const websiteLabel = 'The Covid-19 Data Tracking Application'

const router = createRouter({
  history: isSSR ? createMemoryHistory() : createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/pages/HomePage.vue'),
      meta: {
        title: `Home Page - ${websiteLabel}`,
      },
    },
    {
      path: '/cases',
      component: () => import('@/pages/NationalCases.vue'),
      meta: {
        title: `Case History - ${websiteLabel}`,
      },
    },
    {
      path: '/tests',
      component: () => import('@/pages/NationalTests.vue'),
      meta: {
        title: `Testing History - ${websiteLabel}`,
      },
    },
    {
      path: '/hospitalization',
      component: () => import('@/pages/NationalHospitalization.vue'),
      meta: {
        title: `Hospitalization History - ${websiteLabel}`,
      },
    },
    {
      path: '/state/:state',
      component: () => import('@/pages/StateHistory.vue'),
      props: true,
      meta: {
        title: `Historic values for the state - ${websiteLabel}`,
      },
    },
    {
      path: "/:pathMatch(.*)*",
      component: () => import("@/pages/NotFound.vue"),
      meta: {
        title: `Page Not Found - ${websiteLabel}`,
      },
    },
  ],
}) as CustomRouter

router.meta = {}
router.getMetaData = function() {
  if (this.meta) {
    return this.meta
  }

  return { title: websiteLabel }
}

export default hooks(router)

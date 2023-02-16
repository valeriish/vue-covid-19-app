import { createRouter, createMemoryHistory, createWebHistory } from 'vue-router'
const isSSR = process.env.VUE_APP_SSR || false

export default createRouter({
  history: isSSR ? createMemoryHistory() : createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/pages/HomePage.vue'),
    },
    {
      path: '/cases',
      component: () => import('@/pages/NationalCases.vue'),
    },
    {
      path: '/tests',
      component: () => import('@/pages/NationalTests.vue'),
    },
    {
      path: '/hospitalization',
      component: () => import('@/pages/NationalHospitalization.vue'),
    },
  ],
})

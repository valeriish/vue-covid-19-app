import { shallowMount } from '@vue/test-utils'
import { RouterLink } from 'vue-router'

import NavigationLink from '@/components/NavigationLink.vue'

describe('NavigationLink.vue', () => {
  test('renders a local link', () => {
    const wrapper = shallowMount(NavigationLink, {
      propsData: {
        path: '/abc',
        label: 'ABC'
      }
    })

    const link = wrapper.findComponent(RouterLink)

    expect(link.exists()).toBe(true)
  })

  test('renders a global link', () => {
    const wrapper = shallowMount(NavigationLink, {
      propsData: {
        path: 'https://abc.com',
        label: 'ABC'
      }
    })

    const link = wrapper.findComponent(RouterLink)

    expect(link.exists()).toBe(false)
    expect(wrapper.find('a').exists()).toBeTruthy()
  })
})

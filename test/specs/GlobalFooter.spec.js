import { shallowMount } from '@vue/test-utils'

import GlobalFooter from '@/components/GlobalFooter.vue'

describe('GlobalFooter.vue', () => {
  test('renders a footer', () => {
    const wrapper = shallowMount(GlobalFooter)
    const year = new Date().getFullYear()
    
    const copyright = wrapper.get('footer > div')
    expect(copyright.text()).toBe(`©Copyright ${year}`)
  })
})

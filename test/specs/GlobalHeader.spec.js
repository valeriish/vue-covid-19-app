import { shallowMount } from '@vue/test-utils'

import GlobalHeader from '@/components/GlobalHeader.vue'

describe('GlobalHeader.vue', () => {
  test('renders a header', () => {
    const wrapper = shallowMount(GlobalHeader)

    expect(wrapper.find('header').exists()).toBeTruthy()
  })
})

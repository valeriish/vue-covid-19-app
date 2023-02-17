<template>
  <GlobalHeader :links="links" />
  <main>
    <router-view />
  </main>
  <GlobalFooter />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import GlobalHeader from '@/components/GlobalHeader.vue'
import GlobalFooter from '@/components/GlobalFooter.vue'

@Options({
  components: {
    GlobalHeader,
    GlobalFooter,
  },
})
export default class App extends Vue {
  links = [
    {
      label: 'Home',
      path: '/'
    },
    {
      label: 'Cases',
      path: '/cases'
    },
    {
      label: 'Tests',
      path: '/tests'
    },
    {
      label: 'Hospitalization',
      path: '/hospitalization'
    }
  ]
}
</script>

<style>
@import './assets/global.css';
</style>

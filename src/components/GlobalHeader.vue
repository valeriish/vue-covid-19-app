<template>
  <header>
    <router-link to="/">
      <img
        alt="Vue logo"
        class="logo"
        src="../assets/logo.png"
      >
      <span>
        The Covid-19 Data Tracking
      </span>
    </router-link>
    <nav>
      <ul
        v-if="links.length"
        class="topnav inline-block"
      >
        <li
          v-for="(link, index) in links"
          :key="index"
        >
          <NavigationLink v-bind="{ ...link }" />
        </li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">
import { RouterLink } from 'vue-router'
import { Options, prop, Vue } from 'vue-class-component'
import NavigationLink from '@/components/NavigationLink.vue'
import type { Link } from '@/types'

@Options ({
  components: {
    RouterLink,
    NavigationLink,
  }
})
export default class TopMenu
  extends Vue.with(class {
    links = prop<Link[]>({ default: []})
  }) {
}
</script>

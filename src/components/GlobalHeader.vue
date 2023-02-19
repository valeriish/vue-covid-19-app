<template>
  <header>
    <router-link to="/">
      <img
        alt="Vue logo"
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
          <router-link :to="link.path">
            {{ link.label }}
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">
import { prop, Vue } from 'vue-class-component'
import type { Link } from '@/types'

export default class TopMenu
  extends Vue.with(class {
    links = prop<Link[]>({ default: []})
  }) {
}
</script>

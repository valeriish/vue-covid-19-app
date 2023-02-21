<template>
  <router-link v-if="path.startsWith('/')" :to="path" >
    {{ label }}
  </router-link>
  <a v-else :href="path">{{ label }}</a>
</template>
<script lang="ts">
import { prop, Vue } from 'vue-class-component'

export default class NavigationLink
  extends Vue.with(class {
    path = prop<string>({ default: '' })
    label = prop<string>({ default: '' })
  }) {
}
</script>

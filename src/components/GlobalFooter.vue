<template>
  <footer>
    <div>&copy;Copyright {{ new Date().getFullYear() }}</div>
  </footer>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'

export default class GlobalFooter extends Vue {}
</script>

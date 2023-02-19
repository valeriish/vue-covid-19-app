<template>
  <div>
    <h1 class="title">404 not found</h1>
    <p>We can’t find the page you are looking for.</p>
    <p>Please check the link to make sure it’s correct.</p>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'

export default class NotFound extends Vue {}
</script>

<style scoped>
  h1,
  p {
    text-align: left;
  }
</style>

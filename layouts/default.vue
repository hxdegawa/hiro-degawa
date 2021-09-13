<template lang="pug">
  .container
    nuxt
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component({})
export default class DefaultLayout extends Vue {
  mounted() {
    let vh: number = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
    window.addEventListener('resize', () => {
      vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    })
  }
}
</script>

<style lang="scss">
.container {
  min-height: calc(var(--vh, 1vh) * 100);
  padding: 60px 40px;

  @media screen and (max-width: $width-tablet-small) {
    padding: 10px;
  }
}
</style>

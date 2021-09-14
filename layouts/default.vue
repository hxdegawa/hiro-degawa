<template lang="pug">
  .container
    global-header
    global-menu
    nuxt
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'nuxt-property-decorator'
import GlobalHeader from '~/components/global/Header.vue'
import GlobalMenu from '~/components/global/Menu.vue'
import { applyLightMode, applyDarkMode } from '~/assets/style/color'

@Component({
  components: {
    GlobalHeader,
    GlobalMenu,
  },
})
export default class DefaultLayout extends Vue {
  @Watch('$colorMode.value', { immediate: true, deep: true })
  applyColorMode(currentMode: any) {
    switch (currentMode) {
      case 'light':
        applyLightMode()
        break

      case 'dark':
        applyDarkMode()
        break
    }
  }

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

.dark-mode .thumbnail {
  filter: brightness(0.6);
}
</style>

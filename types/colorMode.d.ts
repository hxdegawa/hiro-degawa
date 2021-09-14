import { ColorModeInstance } from '@nuxtjs/color-mode/types/color-mode'

declare module 'vue/types/vue' {
  interface Vue {
    readonly $colorMode: ColorModeInstance
  }
}

declare module '@nuxt/types/app' {
  interface NuxtAppOptions {
    readonly $colorMode: ColorModeInstance
  }
}

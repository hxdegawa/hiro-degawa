import { GraphQLClient } from 'graphql-request'

declare module 'vue/types/vue' {
  interface Vue {
    readonly $graphcms: GraphQLClient
  }
}

declare module '@nuxt/types/app' {
  interface NuxtAppOptions {
    readonly $graphcms: GraphQLClient
  }
}

declare module '@nuxt/vue-app' {
  interface Context {
    readonly $graphcms: GraphQLClient
  }
}

declare module '@nuxt/types' {
  interface Context {
    readonly $graphcms: GraphQLClient
  }
}

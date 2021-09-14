<template lang="pug">
  .blogs
    p hoge
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { gql } from 'graphql-request'

@Component({})
export default class IndexPage extends Vue {
  async asyncData(ctx: any) {
    try {
      const { blogs } = await ctx.$graphcms.request(
        gql`
          {
            blogs(orderBy: date_DESC) {
              title
              slug
              body
              date
              thumbnail {
                url
              }
            }
          }
        `
      )

      return { blogs }
    } catch (error) {
      ctx.$sentry.captureException(error)
    }
  }

  getThumbnail(img: any) {
    return img?.url ?? require('~/assets/images/no-image.svg')
  }
}
</script>

<style lang="scss" scoped>
.blogs {
  @include page-base;
}
</style>

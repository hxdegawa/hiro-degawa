<template lang="pug">
  .blog
    h4 日記
    .blog-cards
      blog-card(:blog="blog" v-for="(blog, key) in blogs" :key="key")
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { gql } from 'graphql-request'
import BlogCard from '~/components/blog/BlogCard.vue'

@Component({
  components: {
    BlogCard,
  },
})
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
.blog {
  @include page-base;

  padding: 40px;

  @media screen and (max-width: $width-tablet-large) {
    padding: 30px;
  }

  h4 {
    font-size: 14px;
    margin-bottom: 40px;
  }

  &-cards {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 30px;

    @media screen and (max-width: $width-pc-small) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media screen and (max-width: $width-tablet-large) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media screen and (max-width: $width-mobile) {
      grid-template-columns: repeat(1, 1fr);
    }
  }
}
</style>

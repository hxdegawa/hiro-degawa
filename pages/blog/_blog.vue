<template lang="pug">
  .blog
    .blog__column
      .blog__column__meta
        h4.blog__column__meta__title 概要
        img.blog__column__meta__thumbnail(:src="getThumbnail(blog.thumbnail)")

        h5.blog__column__meta__heading タイトル
        p.blog__column__meta__content {{blog.title}}

        h5.blog__column__meta__heading 日付
        p.blog__column__meta__content {{getDate(blog.date)}}

      .blog__column__body
        .blog__column__body__title 詳細
        .blog__column__body__md.markdown(v-html="$md.render(blog.body)")
      
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { gql } from 'graphql-request'

@Component({})
export default class BlogPage extends Vue {
  async asyncData(ctx: any) {
    try {
      const { blogs } = await ctx.$graphcms.request(
        gql`
        {
          blogs(where: { slug: "${ctx.params.blog}" }) {
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
      if (!blogs[0]) {
        ctx.redirect('/404')
      }

      return { blog: blogs[0] }
    } catch (error) {
      ctx.redirect('/')
    }
  }

  getThumbnail(img: any) {
    return img?.url ?? require('~/assets/images/no-image.svg')
  }

  getDate(date: any) {
    if (date?.length > 1) {
      return this.$moment(date).format(process.env.DATE_FORMAT)
    }
  }
}
</script>

<style lang="scss" scoped>
.blog {
  max-width: $width-pc-small;
  margin: 0 auto;
  background-color: $color-purewhite;

  &__column {
    display: grid;
    grid-template-columns: 4fr 6fr;

    @media screen and (max-width: $width-pc-small) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media screen and (max-width: $width-tablet-small) {
      grid-template-columns: repeat(1, 1fr);
    }

    &__meta {
      padding: 40px;

      @media screen and (max-width: $width-tablet-small) {
        padding: 20px;
      }

      &__title {
        font-size: 14px;
        margin-bottom: 40px;
      }

      &__thumbnail {
        object-fit: contain;
        width: 100%;
        margin-bottom: 40px;
      }

      &__heading {
        font-size: 12px;
        color: $color-gray;
        margin-bottom: 10px;
      }

      &__content {
        font-size: 13px;
        color: $color-black;
        font-weight: normal;
        margin-bottom: 30px;

        a {
          line-height: 30px;

          &:not(:first-child)::before {
            content: '\A';
            white-space: pre;
          }
        }

        * {
          text-transform: initial;
          font-weight: normal;
        }
      }
    }

    &__body {
      padding: 40px;

      @media screen and (max-width: $width-tablet-small) {
        padding: 20px;
      }

      &__title {
        font-size: 14px;
        margin-bottom: 40px;
        color: $color-black;
      }
    }
  }
}
</style>

<template lang="pug">
  .blog
    .blog-column
      .meta
        h4.meta-title 概要
        img.meta-thumbnail(:src="getThumbnail(blog.thumbnail)")

        h5.meta-heading タイトル
        p.meta-content {{blog.title}}

        h5.meta-heading 日付
        p.meta-content {{getDate(blog.date)}}

      .body
        .body-title 詳細
        .body-md.markdown(v-html="$md.render(blog.body)")
      
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

  &-column {
    display: grid;
    grid-template-columns: 4fr 6fr;

    @media screen and (max-width: $width-pc-small) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media screen and (max-width: $width-tablet-small) {
      grid-template-columns: repeat(1, 1fr);
    }

    .meta {
      padding: 40px;

      @media screen and (max-width: $width-tablet-small) {
        padding: 20px;
      }

      &-title {
        font-size: 14px;
        margin-bottom: 40px;
      }

      &-thumbnail {
        object-fit: contain;
        width: 100%;
        margin-bottom: 40px;
      }

      &-heading {
        font-size: 12px;
        color: $color-gray;
        margin-bottom: 10px;
      }

      &-content {
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

    .body {
      padding: 40px;

      @media screen and (max-width: $width-tablet-small) {
        padding: 20px;
      }

      &-title {
        font-size: 14px;
        margin-bottom: 40px;
        color: $color-black;
      }
    }
  }
}
</style>

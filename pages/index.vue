<template lang="pug">
  .top
    .top__column
      .top__column__profile
        .top__column__profile__name
          h2 出川 大和
          h3 Hiro Degawa
          p {{ $moment(new Date()).diff(new Date(birthday), 'years') }}歳。
          p デザインとプログラミングをしています。
          p ミニマルで抽象性の高いデザインが好きです。

        .top__column__profile__sns
          a(href="https://twitter.com/HiroDegawa" target="_blank")
            img(src="~/assets/images/twitter.svg")
          a(href="https://www.instagram.com/hxdegawa/" target="_blank")
            img(src="~/assets/images/instagram.svg")
          a(href="https://www.facebook.com/hxdegawa" target="_blank")
            img(src="~/assets/images/facebook.svg")
          a(href="https://github.com/hxdegawa" target="_blank")
            img(src="~/assets/images/github.svg")
          a(href="https://www.behance.net/hiro-degawa" target="_blank")
            img(src="~/assets/images/behance.svg")
          a(href="https://www.linkedin.com/in/hirokazu-degawa/" target="_blank")
            img(src="~/assets/images/linkedin.svg")
          a(href="https://www.wantedly.com/users/24614872" target="_blank")
            img(src="~/assets/images/wantedly.svg")
        
      .top__column__items
        .top__column__items__works
          h4 作品
          .top__column__items__works__cards
            nuxt-link(v-for="(work, key) in works" :key="key" :to="{name: 'work-work', params: {work: work.slug}}").top__column__items__works__cards__item
              img(:src="getThumbnail(work.thumbnail)").top__column__items__works__cards__item__thumbnail

        .top__column__items__blogs
          h4 日記
          .top__column__items__blogs__cards
            nuxt-link(v-for="(blog, key) in blogs" :key="key" :to="{name: 'blog-blog', params: {blog: blog.slug}}").top__column__items__blogs__cards__item
              p.top__column__items__blogs__cards__item__title {{ blog.title }}
              span.top__column__items__blogs__cards__item__date {{ $moment(blog.date).format(dateFormat) }}

</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { gql } from 'graphql-request'

@Component({})
export default class IndexPage extends Vue {
  async asyncData(ctx: any) {
    try {
      const birthday = ctx.env.BIRTHDAY
      const { works, blogs } = await ctx.$graphcms.request(
        gql`
          {
            works(orderBy: date_DESC) {
              title
              slug
              url
              body
              date
              thumbnail {
                url
              }
            }

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

      return { works, blogs, birthday }
    } catch (error) {
      ctx.$sentry.captureException(error)
    }
  }

  get dateFormat() {
    return process.env.DATE_FORMAT
  }

  getThumbnail(img: any) {
    return img?.url ?? require('~/assets/images/no-image.svg')
  }
}
</script>

<style lang="scss" scoped>
.top {
  @include page-base;

  &__column {
    display: grid;
    grid-template-columns: 3fr 7fr;
    gap: 30px;

    @media screen and (max-width: $width-pc-small) {
      grid-template-columns: 4fr 6fr;
    }

    @media screen and (max-width: $width-tablet-large) {
      grid-template-columns: repeat(1, 1fr);
    }

    &__items {
      padding: 40px;

      @media screen and (max-width: $width-tablet-small) {
        padding: 20px;
      }

      h4 {
        font-size: 14px;
        margin-bottom: 40px;
      }

      &__works {
        &__cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
          margin-bottom: 60px;

          @media screen and (max-width: $width-pc-small) {
            grid-template-columns: repeat(2, 1fr);
          }

          @media screen and (max-width: $width-tablet-small) {
            grid-template-columns: repeat(1, 1fr);
          }

          &__item {
            position: relative;
            height: 160px;
            overflow: hidden;

            &__thumbnail {
              object-fit: cover;
              vertical-align: top;
              width: 100%;
              height: 100%;
            }
          }
        }
      }

      &__blogs {
        &__cards {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 30px;

          @media screen and (max-width: $width-tablet-small) {
            grid-template-columns: repeat(1, 1fr);
          }

          &__item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 20px;
            background-color: $color-white;

            @media screen and (max-width: $width-tablet-small) {
              justify-content: flex-d;
              flex-direction: column;
              align-items: flex-start;

              &__date {
                line-height: 30px;
              }
            }

            &__title {
              font-size: 12px;
              line-height: 40px;
              font-weight: normal;
            }

            &__date {
              font-size: 10px;
              font-weight: normal;
              color: $color-lightgray;
            }
          }
        }
      }
    }

    &__profile {
      padding: 40px;

      @media screen and (max-width: $width-tablet-small) {
        padding: 20px;
      }

      &__name {
        h3,
        h2 {
          display: block;
          text-transform: uppercase;
          letter-spacing: 2px;
        }

        h2 {
          font-size: 14px;
          margin-bottom: 5px;
        }

        h3 {
          font-size: 12px;
          margin-bottom: 40px;
        }

        p {
          font-size: 11px;
          line-height: 30px;
          font-weight: normal;

          &:last-of-type {
            margin-bottom: 20px;
          }
        }
      }

      &__sns {
        display: flex;
        justify-content: space-between;
        max-width: 300px;
        margin-bottom: 30px;

        a {
          display: flex;
          justify-content: center;
          align-items: center;
          opacity: 0.4;
          transition: opacity 0.2s ease;

          &:hover {
            opacity: 1;
          }

          img {
            object-fit: contain;
            width: 24px;
          }
        }
      }
    }
  }
}
</style>

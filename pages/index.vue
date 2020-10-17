<template lang="pug">
  .top
    .top__column
      .top__column__text
        .top__column__text__name
          h2 出川 大和
          h3 Hiro Degawa
          p {{ $moment().diff(new Date(birthday), 'years') }}歳。
          p デザインとプログラミングをしています。
          p ミニマルで抽象性の高いデザインが好きです。

        .top__column__text__sns
          a(href="https://twitter.com/HiroDegawa" target="_blank")
            img(src="~assets/images/twitter.svg")
          a(href="https://www.instagram.com/hxdegawa/" target="_blank")
            img(src="~assets/images/instagram.svg")
          a(href="https://www.facebook.com/hxdegawa" target="_blank")
            img(src="~assets/images/facebook.svg")
          a(href="https://www.linkedin.com/in/hirokazu-degawa/" target="_blank")
            img(src="~assets/images/linkedin.svg")
          a(href="https://www.wantedly.com/users/24614872" target="_blank")
            img(src="~assets/images/wantedly.svg")

      .top__column__works
        h4 作品
        .top__column__works__cards
          nuxt-link.top__column__works__cards__item(v-for="(work, key) in works" :key="key" :to="{name: 'work', params: {work: work.slug}}")
            img(:src="getThumbnail(work.thumbnail)").top__column__works__cards__item__thumbnail
        
</template>

<script lang="ts">
import { Vue, Component, Provide } from 'nuxt-property-decorator'
import { gql } from 'graphql-request'

@Component({})
export default class IndexPage extends Vue {
  async asyncData(ctx: any) {
    try {
      const { works } = await ctx.$graphcms.request(
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
          }
        `
      )

      return { works }
    } catch (error) {
      console.error(error.code)
    }
  }

  get birthday() {
    return process.env.BIRTHDAY
  }

  getThumbnail(img: any) {
    return img?.url ?? require('~/assets/images/no-image.svg')
  }
}
</script>

<style lang="scss" scoped>
.top {
  max-width: $width-pc-small;
  margin: 0 auto;
  background-color: $color-purewhite;

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

    &__works {
      padding: 40px;

      @media screen and (max-width: $width-tablet-small) {
        padding: 20px;
      }

      h4 {
        font-size: 14px;
        margin-bottom: 40px;
      }

      &__cards {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 30px;

        @media screen and (max-width: $width-pc-small) {
          grid-template-columns: repeat(2, 1fr);
        }

        @media screen and (max-width: $width-tablet-small) {
          grid-template-columns: repeat(1, 1fr);
        }

        &__item {
          &__thumbnail {
            object-fit: cover;
            vertical-align: top;
            width: 100%;
          }
        }
      }
    }

    &__text {
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
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        max-width: 300px;
        gap: 20px;

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

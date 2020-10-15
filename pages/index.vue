<template lang="pug">
  .top
    .top__profile
      .top__profile__text
        .top__profile__text__name
          h2 出川 大和
          h3 Hiro Degawa
          p {{ $moment().diff(birthday, 'years') }}歳。
          p デザインとプログラミングをしています。
          p ミニマルで絶対主義的なデザインが好きです。
        .top__profile__text__sns
          a(href="https://twitter.com/HiroDegawa" target="_blank")
            img(src="~assets/images/fb.svg")
          a(href="https://www.facebook.com/hxdegawa" target="_blank")
            img(src="~assets/images/tw.svg")
      .top__profile__img
</template>

<script lang="ts">
import { Vue, Component, Provide } from 'nuxt-property-decorator'

@Component({})
export default class IndexPage extends Vue {
  get birthday() {
    return process.env.BIRTHDAY
  }
}
</script>

<style lang="scss" scoped>
.top {
  max-width: $width-pc-small;
  margin: 0 auto;
  background-color: $color-purewhite;

  &__profile {
    display: grid;
    grid-template-columns: 3fr 6fr;
    gap: 30px;

    @media screen and (max-width: $width-tablet-small) {
      grid-template-columns: repeat(1, 1fr);
    }

    &__img {
      padding: 40px;

      @media screen and (max-width: $width-tablet-small) {
        padding: 20px;
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

<template lang="pug">
  .work
    .work__column
      .work__column__meta
        h4.work__column__meta__title 概要
        img.work__column__meta__thumbnail(:src="getThumbnail(work.thumbnail)")

        h5.work__column__meta__heading プロジェクト名
        p.work__column__meta__content {{work.title}}

        h5.work__column__meta__heading 日付
        p.work__column__meta__content {{getDate(work.date)}}

        h5.work__column__meta__heading 関連リンク
        p.work__column__meta__content: a(v-for="url in work.url" :href="url") {{url}}

      .work__column__body
        .work__column__body__title 詳細
        .work__column__body__md.markdown(v-html="$md.render(work.body)")
      
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { gql } from 'graphql-request'

@Component({})
export default class WorkPage extends Vue {
  async asyncData(ctx: any) {
    try {
      const { works } = await ctx.$graphcms.request(
        gql`
        {
          works(where: { slug: "${ctx.params.work}" }) {
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
      if (!works[0]) {
        ctx.redirect('/404')
      }

      return { work: works[0] }
    } catch (error) {
      ctx.redirect('/')
    }
  }

  getThumbnail(img: any) {
    return img?.url ?? require('~/assets/images/no-image.svg')
  }

  getDate(date: any) {
    if (date?.length > 1) {
      return (
        this.$moment(date[0]).format(process.env.DATE_FORMAT) +
        ' ~ ' +
        this.$moment(date[1]).format(process.env.DATE_FORMAT)
      )
    } else {
      return this.$moment(date[0]).format(process.env.DATE_FORMAT)
    }
  }
}
</script>

<style lang="scss" scoped>
.work {
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
      }
    }
  }
}
</style>

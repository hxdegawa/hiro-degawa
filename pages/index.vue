<template lang="pug">
  .top
    .top-column
      .profile
        .profile-bio
          h1 出川 大和
          h2 Hiro Degawa
          p {{ $moment(new Date()).diff(new Date(birthday), 'years') }}歳。
          p デザインとプログラミングをしています。
          p ミニマルで抽象性の高いデザインが好きです。

        .profile-sns
          a(v-for="(sns, key) in snsList" :key="key" :href="sns.url" target="_blank" rel="noopener noreferrer")
            img(:src="require(`~/assets/images/${sns.name}.svg`)" :alt="sns.name")
        
      .items
        .items-works
          h4 作品
          .cards
            work-card(:work="work" v-for="(work, key) in works" :key="key")

        .items-blogs
          h4 日記
          .cards
            blog-card(:blog="blog" v-for="(blog, key) in blogs" :key="key")

</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { Context } from '@nuxt/types/app'
import { gql } from 'graphql-request'
import sns from '~/lib/sns.json'
import WorkCard from '~/components/work/WorkCard.vue'
import BlogCard from '~/components/blog/BlogCard.vue'

@Component({
  components: {
    WorkCard,
    BlogCard,
  },
})
export default class IndexPage extends Vue {
  async asyncData(ctx: Context) {
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
                url(
                  transformation: {
                    image: { resize: { width: 600, height: 400, fit: clip } }
                  }
                )
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

  get snsList() {
    return sns
  }
}
</script>

<style lang="scss" scoped>
.top {
  @include page-base;

  &-column {
    display: grid;
    grid-template-columns: 3fr 7fr;
    gap: 30px;

    @media screen and (max-width: $width-pc-small) {
      grid-template-columns: 4fr 6fr;
    }

    @media screen and (max-width: $width-tablet-large) {
      grid-template-columns: repeat(1, 1fr);
    }
  }

  .profile {
    padding: 40px;

    @media screen and (max-width: $width-tablet-small) {
      padding: 20px;
    }

    &-bio {
      h1,
      h2 {
        display: block;
        text-transform: uppercase;
        letter-spacing: 2px;
      }

      h1 {
        font-size: 14px;
        margin-bottom: 5px;
      }

      h2 {
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

    &-sns {
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

  .items {
    padding: 40px;

    @media screen and (max-width: $width-tablet-small) {
      padding: 20px;
    }

    h4 {
      font-size: 14px;
      margin-bottom: 40px;
    }

    &-works {
      .cards {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 30px;
        margin-bottom: 60px;

        @media screen and (max-width: $width-pc-small) {
          grid-template-columns: repeat(2, 1fr);
        }
      }
    }

    &-blogs {
      .cards {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 30px;

        @media screen and (max-width: $width-tablet-small) {
          grid-template-columns: repeat(1, 1fr);
        }
      }
    }
  }
}
</style>

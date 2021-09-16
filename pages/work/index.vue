<template lang="pug">
  .work
    h4 作品
    .work-cards
      work-card(:work="work" v-for="(work, key) in works" :key="key")
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { gql } from 'graphql-request'
import WorkCard from '~/components/work/WorkCard.vue'

@Component({
  components: {
    WorkCard,
  },
})
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
      ctx.$sentry.captureException(error)
    }
  }

  getThumbnail(img: any) {
    return img?.url ?? require('~/assets/images/no-image.svg')
  }
}
</script>

<style lang="scss" scoped>
.work {
  @include page-base;

  padding: 40px;

  h4 {
    font-size: 14px;
    margin-bottom: 40px;
  }

  &-cards {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 50px;
    margin-bottom: 60px;

    @media screen and (max-width: $width-pc-small) {
      grid-template-columns: repeat(3, 1fr);
      gap: 30px;
    }

    @media screen and (max-width: $width-mobile) {
      grid-template-columns: repeat(2, 1fr);
      gap: 30px;
    }
  }
}
</style>

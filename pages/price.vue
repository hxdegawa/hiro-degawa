<template lang="pug">
  .price
    .price-column
      .plan(v-for="(plan, key) in prices" :key="key")
        h2.plan-name {{ plan.name }}
        p.plan-desc.markdown(v-html="plan.description.html")
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { Context } from '@nuxt/types/app'
import { gql } from 'graphql-request'

@Component({})
export default class PricePage extends Vue {
  async asyncData(ctx: Context) {
    try {
      const { prices } = await ctx.$graphcms.request(
        gql`
          {
            prices {
              name
              description {
                html
              }
            }
          }
        `
      )

      return { prices }
    } catch (error) {
      ctx.$sentry.captureException(error)
    }
  }
}
</script>

<style lang="scss" scoped>
.price {
  @include page-base;

  padding: 40px;

  &-column {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;

    .plan {
      &-name {
        font-size: 18px;
        font-weight: 700;
        margin-bottom: 40px;
      }

      &-desc {
        font-size: 11px;
        margin-bottom: 40px;
        font-weight: 500;
      }
    }
  }
}
</style>

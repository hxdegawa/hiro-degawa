<template lang="pug">
  .price
    h1 ご依頼
    .price-column
      .plan(v-for="(plan, key) in prices" :key="key")
        h2.plan-name {{ plan.name }}
        p.plan-price {{ parsePrice(plan.price) }}
        client-only
          p.plan-desc.markdown(v-html="$md.render(plan.description)")
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
              price
              description
            }
          }
        `
      )

      return { prices }
    } catch (error) {
      ctx.$sentry.captureException(error)
    }
  }

  parsePrice(price: string) {
    if (isNaN(parseInt(price, 10))) {
      return price
    } else {
      return parseInt(price, 10).toLocaleString('ja', { useGrouping: true })
    }
  }
}
</script>

<style lang="scss" scoped>
.price {
  @include page-base;

  padding: 40px;

  h1 {
    font-size: 14px;
    margin-bottom: 40px;
  }

  &-column {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 80px;

    .plan {
      &-name {
        font-size: 12px;
        font-weight: 700;
        margin-bottom: 10px;
      }

      &-price {
        font-size: 10px;
        font-weight: 400;
        margin-bottom: 30px;
        color: $color-gray;

        &::before {
          content: '¥';
          margin-right: 0.5em;
        }

        &::after {
          content: '~';
          margin-left: 0.5em;
        }
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

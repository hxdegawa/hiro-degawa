<template lang="pug">
  .not-found
    .not-found__message
      p.not-found__message__code 404
      .not-found__message__text
        p ページが見つかりませんでした。
        p 5秒後にリダイレクトします。
    
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component({})
export default class NotFoundPage extends Vue {
  mounted() {
    setTimeout(() => {
      this.$router.push({ name: 'index' })
    }, 5000)
  }
}
</script>

<style lang="scss" scoped>
.not-found {
  min-height: calc(var(--vh, 1vh) * 100 - 210px);
  display: flex;
  justify-content: center;
  align-items: center;

  &__message {
    display: flex;

    &__code {
      font-size: 30px;
      font-weight: normal;
      letter-spacing: 2px;
      line-height: 60px;
      margin-right: 20px;
    }

    &__text {
      p {
        font-size: 11px;
        font-weight: normal;
        line-height: 30px;
      }
    }
  }
}
</style>

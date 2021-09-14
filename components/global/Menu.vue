<template lang="pug">
  .menu(:class="{active: menuStatus}")
    transition(name="general")
      .content(v-show="menuStatus")
        ul.content-list
          ol.content-item 作品
          ol.content-item 日記
          ol.content-item ご依頼
        .darkmode(@click="toggleDarkMode")
          div
            .material-icons.darkmode__icon dark_mode
            p.darkmode__label ダークモード
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { Getter } from 'vuex-class'

@Component({})
export default class GlobalMenu extends Vue {
  @Getter('menu/menuStatus') menuStatus!: boolean

  toggleDarkMode() {
    switch (this.$colorMode.preference) {
      case 'system':
      case 'dark':
        this.$colorMode.preference = 'light'
        break

      case 'light':
        this.$colorMode.preference = 'dark'
    }
  }
}
</script>

<style lang="scss" scoped>
.menu {
  transition: 0.4s ease;
  position: sticky;
  top: 80px;
  height: 0;
  width: 100%;
  z-index: 9;
  background-color: $color-purewhite;
  max-width: $width-pc-small;
  margin: 0 auto;

  @mixin mask {
    content: '';
    display: block;
    position: absolute;
    background-color: $color-white;
    width: 100%;
    left: 0;
    transition: height 0.2s ease, background-color 0.4s ease;
  }

  &::before {
    @include mask();

    height: 0;
    bottom: 100%;
  }

  &::after {
    @include mask();

    height: 0;
    top: 100%;
  }

  &.active {
    height: 80px;
    margin: 0 auto 30px auto;

    &::before,
    &::after {
      height: 10px;
    }
  }

  .content {
    overflow: hidden;
    display: grid;
    grid-template-columns: 1fr 80px;
    gap: 20px;
    height: inherit;
    padding: 0 20px 0 40px;

    * {
      height: fit-content;
    }

    &-list {
      width: 100%;
      display: flex;
      height: 100%;
      align-items: center;
      margin: 0;
      gap: 10px;
    }

    &-item {
      padding: 0;
      display: inline-block;
      transform-origin: left top;
      font-size: 0.7rem;
      word-break: keep-all;
      font-weight: medium;
    }

    .darkmode {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      height: 100%;

      &__icon {
        display: block;
        text-align: center;
        font-size: 24px;
        flex-grow: 1;
        color: $color-lightgray;
        transition: color 0.2s ease;
      }

      &__label {
        padding: 5px 0 0 0;
        font-size: 0.6rem;
        font-weight: medium;
        color: $color-lightgray;
        transition: color 0.2s ease;
      }

      &:hover {
        .darkmode {
          &__icon {
            color: $color-darkgray;
          }

          &__label {
            color: $color-darkgray;
          }
        }
      }
    }
  }
}
</style>

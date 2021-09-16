<template lang="pug">
  .header
    .header-prev(@click="pageBack")
      transition(name="general")
        i.material-icons arrow_back
    
    nuxt-link.header-symbol(to="/")
      img.header-img(src="~/assets/images/h.svg", alt="logo" :class="{invert: $colorMode.value === 'dark'}")
    
    .header-menu(@click="triggerMenu")
      i.material-icons {{ isMenuOpen ? 'close' : 'menu' }}
      
</template>

<script lang="ts">
import { Vue, Component, Provide } from 'nuxt-property-decorator'
import { Mutation, Getter } from 'vuex-class'

@Component({})
export default class GlobalHeader extends Vue {
  @Provide() hasHistory: boolean = false
  @Getter('menu/isMenuOpen') isMenuOpen!: boolean

  pageBack() {
    window.history.back()
  }

  triggerMenu() {
    this.toggleMenu()
  }

  @Mutation('menu/toggleMenu') toggleMenu!: () => void
}
</script>

<style lang="scss" scoped>
.header {
  position: sticky;
  top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 20px;
  background-color: $color-purewhite;
  max-width: $width-pc-small;
  margin: 0 auto 30px auto;
  z-index: 10;

  @mixin mask {
    content: '';
    position: absolute;
    height: 10px;
    background-color: $color-white;
    width: 100%;
    left: 0;
  }

  &::before {
    @include mask();

    top: -10px;
  }

  &::after {
    @include mask();

    bottom: -10px;
  }

  &-prev {
    cursor: pointer;
    height: 40px;
    width: 40px;
    text-align: center;

    .material-icons {
      line-height: 40px;
      color: $color-darkgray;
    }
  }

  &-symbol {
    height: 50px;
    width: 50px;

    .header-img {
      object-fit: contain;
      height: 100%;

      &.invert {
        filter: invert(1);
      }
    }
  }

  &-menu {
    height: 40px;
    width: 40px;
    cursor: pointer;
    text-align: center;

    .material-icons {
      line-height: 40px;
      color: $color-darkgray;
    }
  }
}
</style>

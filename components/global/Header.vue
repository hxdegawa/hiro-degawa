<template lang="pug">
  .header
    div.header-prev(@click="pageBack")
      transition(name="page")
        i.material-icons(v-show="hasHistory") arrow_back
    
    nuxt-link.header-symbol(to="/")
      img.header-img(src="~/assets/images/h.svg", alt="logo")
    nuxt-link.header-next(to="/")
</template>

<script lang="ts">
import { Vue, Component, Provide, Watch } from 'nuxt-property-decorator'

@Component({})
export default class GlobalHeader extends Vue {
  @Provide() hasHistory: boolean = false

  @Watch('$route', { immediate: false, deep: true })
  watchPath() {
    this.checkPath()
  }

  pageBack() {
    window.history.back()
    this.checkPath()
  }

  checkPath() {
    return (this.hasHistory = window.history.length > 1 ? true : false)
  }

  mounted() {
    this.checkPath()
  }
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 20px;
  background-color: $color-purewhite;
  max-width: $width-pc-small;
  margin: 0 auto 30px auto;

  &-prev {
    cursor: pointer;
    height: 40px;
    width: 40px;

    .material-icons {
      line-height: 40px;
      color: $color-darkgray;
    }
  }

  &-img {
    transition: 0.2s ease;
    transform: scale(1);
    object-fit: contain;
    height: 100%;
  }

  &-symbol {
    height: 50px;
    width: 50px;

    &:hover {
      .header-img {
        transform: scale(1.2);
      }
    }
  }
}
</style>

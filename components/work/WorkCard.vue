<template lang="pug">
  nuxt-link(:to="{name: 'work-work', params: {work: work.slug}}").item
    img(:src="getThumbnail(work.thumbnail)").item-thumbnail.thumbnail
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component({})
export default class WorkCard extends Vue {
  @Prop() work: any

  getThumbnail(img: any) {
    return img?.url ?? require('~/assets/images/no-image.svg')
  }
}
</script>

<style lang="scss" scoped>
.item {
  position: relative;
  height: 160px;
  overflow: hidden;

  @media screen and (max-width: $width-tablet-small) {
    height: 100px;
  }

  &-thumbnail {
    object-fit: cover;
    vertical-align: top;
    width: 100%;
    height: 100%;
  }
}
</style>

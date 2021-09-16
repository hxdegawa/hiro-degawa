<template lang="pug">
  nuxt-link(:to="{name: 'blog-blog', params: {blog: blog.slug}}").item
    p.item-title {{ blog.title }}
    span.item-date {{ $moment(blog.date).format(dateFormat) }}
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component({})
export default class BlogCard extends Vue {
  @Prop() blog: any

  get dateFormat() {
    return process.env.DATE_FORMAT
  }
}
</script>

<style lang="scss" scoped>
.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: $color-white;

  @media screen and (max-width: $width-tablet-small) {
    justify-content: flex-d;
    flex-direction: column;
    align-items: flex-start;

    &-date {
      line-height: 30px;
    }
  }

  &-title {
    font-size: 12px;
    line-height: 40px;
    font-weight: normal;
  }

  &-date {
    font-size: 10px;
    font-weight: normal;
    color: $color-lightgray;
  }
}
</style>

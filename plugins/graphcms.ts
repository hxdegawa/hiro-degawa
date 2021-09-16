import { GraphQLClient } from 'graphql-request'
import { Inject } from '@nuxt/types/app'
import { Context } from '@nuxt/types'

export default (ctx: Context, inject: Inject) => {
  const graphcmsClient = new GraphQLClient(ctx.env.CMS_URL)

  inject('graphcms', graphcmsClient)
}

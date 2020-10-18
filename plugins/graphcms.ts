import { GraphQLClient } from 'graphql-request'
import { Context } from '@nuxt/types'

export default (ctx: Context, inject: any) => {
  const graphcmsClient = new GraphQLClient(ctx.env.CMS_URL)

  inject('graphcms', graphcmsClient)
}

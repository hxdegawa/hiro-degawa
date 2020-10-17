import { GraphQLClient } from 'graphql-request'
import { Context } from '@nuxt/types'

const graphcmsClient = new GraphQLClient(
  'https://api-ap-northeast-1.graphcms.com/v2/ckgc6kqfe2ofm01z892sigceo/master'
)

export default (_: Context, inject: any) => {
  inject('graphcms', graphcmsClient)
}

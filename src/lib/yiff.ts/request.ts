import { fetch, FetchMethods, FetchResultTypes } from '@sapphire/fetch'
import type Client from 'lib/Structures/client'
import c from './constants'
import type { Config } from './types'

export default async function request(client: Client, options: Config): Promise<unknown> {
  switch (options.site) {
    case 'e621': {
      if (!options.limit) throw Error('No tags provided')
      const { posts }: { posts: Record<string, unknown> } = await fetch(
        `https://e621.net/posts.json?tags=limit:${options.limit} order:random -young ${options.tags}`,
        {
          method: FetchMethods.Get,
          headers: {
            'User-Agent': `${c.defaults.useragent} [ID: ${client.id}]`,
            Authorization: options?.apiKey ? options?.apiKey : ''
          }
        },
        FetchResultTypes.JSON
      )
      return posts
    }
    case 'floofy': {
      const res = await fetch(
        'https://api.floofy.dev/yiff',
        {
          method: FetchMethods.Get,
          headers: {
            'User-Agent': c.defaults.useragent
          }
        },
        FetchResultTypes.JSON
      )
      return res
    }
  }
}

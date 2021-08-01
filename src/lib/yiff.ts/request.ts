import { fetch, FetchResultTypes } from '@sapphire/fetch'
import c from './constants'
import { Config } from './types'

export default async function request (options: Config): Promise<unknown> {
	switch (options.site) {
		case 'e621': {
			if (!options.limit) throw Error('No tags provided')
			const res = await fetch(
				`${options.killswitch.instance ?? c.defaults.killswitch}${c.killswitch.e621}?${options.limit ?? 1}&tags=${options.tags}&useragent${c.defaults.useragent}`,
				{
					headers: {
						'User-Agent': c.defaults.useragent
					}
				},
				FetchResultTypes.JSON)
			return res
		}
		case 'floofy': {
			if (!options.limit) throw Error('No tags provided')
			const res = await fetch(
				`${c.defaults.killswitch}${c.killswitch.floofy}`,
				{
					headers: {
						'User-Agent': c.defaults.useragent
					}
				},
				FetchResultTypes.JSON)
			return res
		}
	}
}

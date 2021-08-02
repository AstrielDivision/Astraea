import { fetch, FetchMethods, FetchResultTypes } from '@sapphire/fetch'
import c from './constants'
import { Config } from './types'

export default async function request (options: Config): Promise<unknown> {
	switch (options.site) {
		case 'e621': {
			if (!options.limit) throw Error('No tags provided')
			const res = await fetch(
				`${c.defaults.killswitch}${c.killswitch.e621}?limit=${options.limit}&tags=${options.tags}&useragent${c.defaults.useragent}`,
				{
					method: FetchMethods.Get,
					headers: {
						'User-Agent': c.defaults.useragent
					}
				},
				FetchResultTypes.JSON)
			return res
		}
		case 'floofy': {
			const res = await fetch(
				`${c.defaults.killswitch}${c.killswitch.floofy}`,
				{
					method: FetchMethods.Get,
					headers: {
						'User-Agent': c.defaults.useragent
					}
				},
				FetchResultTypes.JSON)
			return res
		}
	}
}

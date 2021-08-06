import { User, Snowflake, Guild } from 'discord.js'
import { fetch, FetchMethods, FetchResultTypes } from '@sapphire/fetch'
import Client from './Structures/client'
import { pkg } from '../config'

const userAgent = `Astraea/v${pkg.version} (github.com/AstraeaStudios/Astraea)`

export default class Utils {
	client: Client
	constructor (client: Client) {
		this.client = client
	}

	public randomString (length: number): string {
		return Math.random().toString(21).substr(2, length)
	}

	public async findUser (ID: string | Snowflake): Promise<User> {
		const user = this.client.users.cache.get(ID)

		if (!user) throw Error('User not found')

		return user
	}

	public async findGuild (ID: string | Snowflake): Promise<Guild> {
		const guild = this.client.guilds.cache.get(ID)

		if (!guild) throw Error('User not found')

		return guild
	}

	public async Fetch (url: string, type?: FetchResultTypes): Promise<unknown> {
		if (!url) throw Error('No URL provided')

		const res = await fetch(
			url,
			{
				method: FetchMethods.Get,
				headers: {
					'User-Agent': userAgent
				}
			},
			type ?? FetchResultTypes.Text
		)

		return res
	}
}

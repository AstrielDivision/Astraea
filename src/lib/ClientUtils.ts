import { fetch, FetchMethods, FetchResultTypes } from '@sapphire/fetch'
import { Guild, Snowflake, User } from 'discord.js'
import { URL } from 'url'
import cfg, { pkg } from '../config'
import Client from './Structures/client'

const userAgent = `Astraea/v${pkg.version} (github.com/AstraeaStudios/Astraea)`

export default class Utils {
	client!: Client
	constructor (client: Client) {
		this.client = client
	}

	public randomString (length: number): string {
		return Math.random().toString(21).substr(2, length)
	}

	public async findUser (id: string | Snowflake): Promise<User> {
		const user = await this.client.users.resolve(id)?.fetch()

		if (!user) throw Error('User not found')

		return user
	}

	public async findGuild (id: string | Snowflake): Promise<Guild> {
		const guild = await this.client.guilds.resolve(id)?.fetch()

		if (!guild) throw Error('Guild not found')

		return guild
	}

	public async fetch (url: string | URL, type: FetchResultTypes = FetchResultTypes.JSON): Promise<unknown> {
		if (!url) throw new Error('No URL provided')

		return await fetch(
			url,
			{
				method: FetchMethods.Get,
				headers: {
					'User-Agent': userAgent
				}
			},
			type
		)
	}

	public isOwner (id: string | Snowflake): boolean {
		return cfg.owners.includes(id)
	}
}

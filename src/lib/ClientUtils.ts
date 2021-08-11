import { fetch, FetchMethods, FetchResultTypes } from '@sapphire/fetch'
import { Guild, Snowflake, User } from 'discord.js'
import { Response } from 'node-fetch'
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

	public async findUser (id: string | Snowflake): Promise<User | undefined> {
		return await this.client.users.resolve(id)?.fetch()
	}

	public async findGuild (id: string | Snowflake): Promise<Guild | undefined> {
		return await this.client.guilds.resolve(id)?.fetch()
	}

	public async fetch<R = unknown>(url: string | URL, type: FetchResultTypes.JSON): Promise<R>
	public async fetch (url: string | URL, type: FetchResultTypes.Buffer): Promise<Buffer>
	public async fetch (url: string | URL, type: FetchResultTypes.Text): Promise<string>
	public async fetch (url: string | URL, type: FetchResultTypes.Result): Promise<Response>
	public async fetch<R = unknown, T extends FetchResultTypes = FetchResultTypes.JSON>(url: string | URL, type: T): Promise<Response | Buffer | string | R> {
		if (!url) throw new Error('No URL provided')

		return await fetch<R>(
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

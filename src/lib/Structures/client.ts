import { SapphireClient } from '@sapphire/framework'
import { Intents } from 'discord.js'
import cfg from '../../config'

export default class Client extends SapphireClient {
	constructor () {
		super({
			ws: {
				intents: [Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
			},
			defaultPrefix: 'n^',
			caseInsensitivePrefixes: true,
			caseInsensitiveCommands: true
		})
	}

	public async start (): Promise<Client> {
		// eslint-disable-next-line no-console
		console.log('Starting North Client')
		await super.login(cfg.token)

		return this
	}
}

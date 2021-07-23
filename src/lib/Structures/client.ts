import { SapphireClient } from '@sapphire/framework'
import { Intents } from 'discord.js'
import { KSoftClient } from '@aero/ksoft'
import cfg from '../../config'

export default class Client extends SapphireClient {
	ksoft: KSoftClient
	constructor () {
		super({
			ws: {
				intents: [Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
			},
			defaultPrefix: cfg.prefix,
			caseInsensitivePrefixes: true,
			caseInsensitiveCommands: true,
			presence: {
				status: 'idle',
				activity: {
					name: `The Stars in the midnight sky | ${cfg.prefix}`,
					type: 'WATCHING'
				}
			}
		})

		this.ksoft = new KSoftClient(cfg.ksoft)
	}

	public async start (): Promise<Client> {
		// eslint-disable-next-line no-console
		console.log('Starting North Client')
		await super.login(cfg.token)

		return this
	}
}

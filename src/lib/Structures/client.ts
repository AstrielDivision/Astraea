import { SapphireClient, SapphireClientOptions } from '@sapphire/framework'
import { KSoftClient } from '@aero/ksoft'
import cfg from '../../config'

export default class Client extends SapphireClient {
	ksoft: KSoftClient
	constructor (options: SapphireClientOptions) {
		super(options)

		this.ksoft = new KSoftClient(cfg.ksoft)
	}

	public async start (): Promise<Client> {
		await super.login(cfg.token)

		return this
	}
}

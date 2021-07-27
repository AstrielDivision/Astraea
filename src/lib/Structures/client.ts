import { SapphireClient, SapphireClientOptions } from '@sapphire/framework'
// import '@sapphire/plugin-api/register'
import { KSoftClient } from '@aero/ksoft'
import cfg from '../../config'

export default class Client extends SapphireClient {
	ksoft: KSoftClient
	// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
	constructor (options: SapphireClientOptions | any) {
		super(options)

		this.ksoft = new KSoftClient(cfg.ksoft)
	}

	public async start (): Promise<Client> {
		await super.login(cfg.token)

		return this
	}
}

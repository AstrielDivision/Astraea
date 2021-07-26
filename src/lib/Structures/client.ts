import { SapphireClient, SapphireClientOptions } from '@sapphire/framework'
import { KSoftClient } from '@aero/ksoft'
import MusicManager from '../Music/Manager'
import cfg from '../../config'

export default class Client extends SapphireClient {
	ksoft: KSoftClient
	music: MusicManager
	constructor (options: SapphireClientOptions) {
		super(options)

		this.music = new MusicManager(this)
		this.ksoft = new KSoftClient(cfg.ksoft)
	}

	public async start (): Promise<Client> {
		await super.login(cfg.token)

		return this
	}
}

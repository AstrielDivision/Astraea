import { SapphireClient, SapphireClientOptions } from '@sapphire/framework'
// import '@sapphire/plugin-api/register'
import { KSoftClient } from '@aero/ksoft'
import StatusUpdater from '@tmware/status-rotate'
import cfg from '../../config'

export default class Client extends SapphireClient {
	ksoft: KSoftClient
	statusUpdater: StatusUpdater
	constructor (options: SapphireClientOptions) {
		super(options)

		this.ksoft = new KSoftClient(cfg.ksoft)
		this.statusUpdater = new StatusUpdater(this)
	}

	/**
	 * Start the Client / Bot
	 * @returns {Promise<Client>}
	 */
	public async start (): Promise<Client> {
		await super.login(cfg.token)

		/**
		 * Remove, edit or add statuses
		 **/
		await this.statusUpdater.addStatus({ type: 'LISTENING', name: `For signals from the endless outer space | ${cfg.prefix}` })
		await this.statusUpdater.addStatus({ type: 'LISTENING', name: `To Music | ${cfg.prefix}` })
		await this.statusUpdater.addStatus({ type: 'PLAYING', name: 'あなたは大丈夫？' })

		// Update the status every 2 minutes
		this.statusUpdater.start(2 * 10 * 1000)

		return this
	}
}

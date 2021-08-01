import { SapphireClient, SapphireClientOptions } from '@sapphire/framework'
import { KSoftClient } from '@aero/ksoft'
import StatusUpdater from '@tmware/status-rotate'
import cfg from '../../config'

export default class Client extends SapphireClient {
	ksoft: KSoftClient
	statusUpdater: StatusUpdater
	constructor (options: SapphireClientOptions) {
		super(options)

		this.ksoft = new KSoftClient(cfg.ksoft)
		this.statusUpdater = new StatusUpdater(this, [
			{ type: 'LISTENING', name: `Signals from the endless outer space | ${cfg.prefix}` },
			{ type: 'LISTENING', name: `Music | ${cfg.prefix}` },
			{ type: 'PLAYING', name: 'あなたは大丈夫？' }
		])
	}

	/**
	 * Start the Client / Bot
	 * @returns {Promise<Client>}
	 */
	public async start (): Promise<Client> {
		await super.login(cfg.token)
		// Start statusUpdater
		await this.statusUpdater.updateStatus()

		// Automate status change
		setInterval(() => {
			void this.statusUpdater.updateStatus()
		}, 2 * 60 * 1000) // Change status every 2 minutes

		/**
		 * Add statuses
		 */
		/*
		await this.statusUpdater.addStatus({ type: 'LISTENING', name: `Signals from the endless outer space | ${cfg.prefix}` })
		await this.statusUpdater.addStatus({ type: 'LISTENING', name: `Music | ${cfg.prefix}` })
		await this.statusUpdater.addStatus({ type: 'PLAYING', name: 'あなたは大丈夫？' }) */

		// Start statusUpdater
		await this.statusUpdater.updateStatus()

		// Automate status change
		setInterval(() => {
			void this.statusUpdater.updateStatus()
		}, 2 * 60 * 1000) // Change status every 2 minutes

		return this
	}
}

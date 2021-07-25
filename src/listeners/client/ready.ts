import { Listener, EventOptions, Events } from '@sapphire/framework'
import { ApplyOptions } from '@sapphire/decorators'
import cfg from '../../config'

@ApplyOptions<EventOptions>({
	once: true,
	event: Events.ClientReady
})
export default class Ready extends Listener {
	public run (): void {
		void this.container.client.user.setPresence({ activity: { name: `The Northern Stars | ${cfg.prefix}`, type: 'WATCHING' }, status: 'idle' })
		return this.container.logger.info(`[North Client]: Ready! Logged in as ${this.container.client.user?.tag} serving ${this.container.client.guilds.cache.size} Guilds and ${this.container.client.users.cache.size}`)
	}
}

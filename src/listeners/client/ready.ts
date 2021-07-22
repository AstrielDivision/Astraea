import { Listener, EventOptions, Events } from '@sapphire/framework'
import { ApplyOptions } from '@sapphire/decorators'

@ApplyOptions<EventOptions>({
	once: true,
	event: Events.ClientReady
})
export default class Ready extends Listener {
	public run (): void {
		return this.container.logger.info(`[North Client]: Ready! Logged in as ${this.container.client.user?.tag} serving ${this.container.client.guilds.cache.size} Guilds and ${this.container.client.users.cache.size}`)
	}
}

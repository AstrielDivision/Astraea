/* eslint-disable @typescript-eslint/no-explicit-any */
import { Listener, ListenerOptions, Events, Store } from '@sapphire/framework'
import { ApplyOptions } from '@sapphire/decorators'

@ApplyOptions<ListenerOptions>({
	once: true,
	event: Events.ClientReady
})
export default class Ready extends Listener {
	private printStoreDebugInformation (): void {
		const { client } = this.container
		const stores = [...client.stores.values()]
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const last = stores.pop()!

		for (const store of stores) this.container.logger.console(this.styleStore(store, false))
		this.container.logger.console(this.styleStore(last, true))
	}

	private styleStore (store: Store<any>, last: boolean): void {
		return this.container.logger.console(`${last ? '└─' : '├─'} Loaded ${store.size} ${store.name}.`)
	}

	public run (): void {
		this.printStoreDebugInformation()
		return this.container.logger.info(`Ready! Logged in as ${this.container.client.user?.tag} serving ${this.container.client.guilds.cache.size} Guilds and ${this.container.client.users.cache.size} Users`)
	}
}

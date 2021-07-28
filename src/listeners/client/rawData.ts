import { Events, Listener, ListenerOptions } from '@sapphire/framework'
import { ApplyOptions } from '@sapphire/decorators'

@ApplyOptions<ListenerOptions>({
	event: Events.Raw
})
export default class GuildDelete extends Listener {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
	public run (data: any): void {
		// eslint-disable-next-line @typescript-eslint/restrict-plus-operands
		this.container.client.logger.info('RawData | ' + data)
	}
}

import { NorthCommand, NorthCommandOptions } from '../../lib/Structures/Command'
import { Message } from 'discord.js'
import { ApplyOptions } from '@sapphire/decorators'

@ApplyOptions<NorthCommandOptions>({
	name: 'ping',
	description: 'Returns bot ping'
})
export default class Ping extends NorthCommand {
	public async run (message: Message): Promise<Message> {
		const ping = await message.channel.send('Pong!')

		return await ping.edit(`Ping: ${this.container.client.ws.ping} ms\nHearbeat: ${ping.createdTimestamp - message.createdTimestamp} ms`)
	}
}

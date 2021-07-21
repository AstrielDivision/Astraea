import { Command, CommandOptions } from '@sapphire/framework'
import { Message } from 'discord.js'
import { ApplyOptions } from '@sapphire/decorators'

@ApplyOptions<CommandOptions>({
	name: 'ping',
	description: 'Returns bot ping'
})
export default class Ping extends Command {
	public async run (message: Message): Promise<Message> {
		const ping = await message.channel.send('Pong!')

		return await ping.edit(`Ping: ${this.container.client.ws.ping} ms\nHearbeat: ${ping.createdTimestamp - message.createdTimestamp} ms`)
	}
}

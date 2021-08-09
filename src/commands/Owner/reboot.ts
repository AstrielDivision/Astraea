import { AstraeaCommand, AstraeaCommandOptions } from '../../lib/Structures/Command'
import { Message } from 'discord.js'
import { ApplyOptions } from '@sapphire/decorators'
import { Args } from '@sapphire/framework'

@ApplyOptions<AstraeaCommandOptions>({
	name: 'reboot',
	description: 'Restart the bot'
})
export default class example extends AstraeaCommand {
	public async run (message: Message, args: Args): Promise<Message> {
		if (!this.container.client.util.isOwner(message.author.id)) {
			return await message.channel.send(
				'You are not permitted to execute this command'
			)
		}
		await message.channel.send('Rebooting!')

		process.exit()
	}
}

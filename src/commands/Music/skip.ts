import { NorthCommand, NorthCommandOptions } from '../../lib/Structures/Command'
import { Message } from 'discord.js'
import { ApplyOptions } from '@sapphire/decorators'

@ApplyOptions<NorthCommandOptions>({
	name: 'skip',
	description: 'Skip currently playing'
})
export default class example extends NorthCommand {
	public async run (message: Message): Promise<Message> {
		const player = this.container.client.music.manager.get(message.guild.id)

		player.stop()

		return await message.channel.send('Skipped current track!')
	}
}

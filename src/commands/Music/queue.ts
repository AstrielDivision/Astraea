import { NorthCommand, NorthCommandOptions } from '../../lib/Structures/Command'
import { Message, MessageEmbed } from 'discord.js'
import { ApplyOptions } from '@sapphire/decorators'

@ApplyOptions<NorthCommandOptions>({
	name: 'example',
	description: 'Solve this'
})
export default class example extends NorthCommand {
	public async run (message: Message): Promise<Message> {
		const player = this.container.client.music.manager.get(message.guild.id)

		const q = player.queue

		const embed = new MessageEmbed()
			.setTitle('Queue')
			.setDescription(q.map((track, i) => `${i++} - ${track.title}`).join('\n'))

		return await message.channel.send(embed)
	}
}

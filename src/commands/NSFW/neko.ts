import { NorthCommand, NorthCommandOptions } from '../../lib/Structures/Command'
import { ApplyOptions } from '@sapphire/decorators'
import { Message, MessageEmbed } from 'discord.js'
import { Image } from '@aero/ksoft'

@ApplyOptions<NorthCommandOptions>({
	name: 'neko',
	description: 'Returns a random image of a neko (These images have been moderated)',
	cooldownLimit: 3,
	cooldownDuration: 2000
})
export default class Neko extends NorthCommand {
	public async run (message: Message): Promise<Message> {
		const { url }: Image = await this.container.client.ksoft.images.random('neko', { nsfw: true })
		const embed = new MessageEmbed()
			.setFooter('Powered by api.ksoft.si')
			.setURL(url)
			.setColor('PINK')
			.setTimestamp()
			.setImage(url)
		return await message.channel.send(embed)
	}
}

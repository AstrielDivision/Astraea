import { NorthCommand, NorthCommandOptions } from '../../lib/Structures/Command'
import { ApplyOptions } from '@sapphire/decorators'
import { Message, MessageEmbed } from 'discord.js'
import { Image } from '@aero/ksoft'

@ApplyOptions<NorthCommandOptions>({
	name: 'dog',
	aliases: ['dog'],
	description: 'Returns an image of a dog',
	cooldownLimit: 3,
	cooldownDelay: 2000
})
export default class Dog extends NorthCommand {
	public async run (message: Message): Promise<Message> {
		const { url }: Image = await this.container.client.ksoft.images.random('dog', { nsfw: false })
		const embed = new MessageEmbed()
			.setTitle('Catt')
			.setFooter('Powered by api.ksoft.si')
			.setURL(url)
			.setColor('BROWN')
			.setTimestamp()
			.setImage(url)
		return await message.channel.send(embed)
	}
}

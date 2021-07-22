import { NorthCommand, NorthCommandOptions } from '../../lib/Structures/Command'
import { ApplyOptions } from '@sapphire/decorators'
import { Message, MessageEmbed } from 'discord.js'
import { WikiHowImage } from '@aero/ksoft'

@ApplyOptions<NorthCommandOptions>({
	name: 'wikihow',
	aliases: ['how'],
	description: 'Returns a random wikihow article',
	cooldownBucket: 3,
	cooldownDuration: 2000
})
export default class Wikihow extends NorthCommand {
	public async run (message: Message): Promise<Message> {
		const { url, article }: WikiHowImage = await this.container.client.ksoft.images.wikihow()
		const embed = new MessageEmbed()
			.setTitle(article.title)
			.setFooter('Powered by api.ksoft.si')
			.setURL(url)
			.setColor('GREEN')
			.setTimestamp()
			.setImage(url)
		return await message.channel.send(embed)
	}
}

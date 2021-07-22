import { NorthCommand, NorthCommandOptions } from '../../lib/Structures/Command'
import { ApplyOptions } from '@sapphire/decorators'
import { Message, MessageEmbed } from 'discord.js'
import { Image } from '@aero/ksoft'

@ApplyOptions<NorthCommandOptions>({
	name: 'birb',
	aliases: ['bird'],
	description: 'Returns an image of a bird',
	cooldownBucket: 3,
	cooldownDuration: 2000
})
export default class BirbCommand extends NorthCommand {
	public async run (message: Message): Promise<Message> {
		const { url }: Image = await this.container.client.ksoft.images.random('birb', { nsfw: false })
		const embed = new MessageEmbed()
			.setFooter('Powered by api.ksoft.si')
			.setURL(url)
			.setColor('LIME')
			.setTimestamp()
			.setImage(url)
		return await message.channel.send(embed)
	}
}

import { NorthCommand, NorthCommandOptions } from '../../lib/Structures/Command'
import { ApplyOptions } from '@sapphire/decorators'
import { Message, MessageEmbed } from 'discord.js'
import { Image } from '@aero/ksoft'

@ApplyOptions<NorthCommandOptions>({
	name: 'aww',
	aliases: ['awww', 'awwww'],
	description: 'Returns a Image from r/astrophotography',
	cooldownBucket: 3,
	cooldownDuration: 2000
})
export default class Aww extends NorthCommand {
	public async run (message: Message): Promise<Message> {
		const { url }: Image = await this.container.client.ksoft.images.aww()
		const embed = new MessageEmbed()
			.setFooter('Powered by api.ksoft.si')
			.setTimestamp()
			.setImage(url)
			.setColor('PINK')
		return await message.channel.send(embed)
	}
}

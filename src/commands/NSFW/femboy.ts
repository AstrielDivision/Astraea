import { AstraeaCommand, AstraeaCommandOptions } from '../../lib/Structures/Command'
import { ApplyOptions } from '@sapphire/decorators'
import { Message, MessageEmbed } from 'discord.js'
import { RedditImage } from '@aero/ksoft'

@ApplyOptions<AstraeaCommandOptions>({
	name: 'femboy',
	aliases: ['femboy', 'femboys', 'femboi', 'fembois'],
	description: 'Returns a Image from r/FemBoys',
	cooldownLimit: 3,
	nsfw: true,
	cooldownDelay: 2000
})
export default class Femboy extends AstraeaCommand {
	public async run (message: Message): Promise<Message> {
		const { url, post }: RedditImage = await this.container.client.ksoft.images.reddit('FemBoys', { span: 'day', removeNSFW: false })
		const embed = new MessageEmbed()
			.setTitle(post.title)
			.setFooter(`Powered by api.ksoft.si ${post.author} | Upvotes: ${post.upvotes} | Downvotes ${post.downvotes}`)
			.setURL(post.link)
			.setColor('PINK')
			.setTimestamp()
			.setImage(url)
		return await message.channel.send(embed)
	}
}

import { NorthCommand, NorthCommandOptions } from '../../lib/Structures/Command'
import { ApplyOptions } from '@sapphire/decorators'
import { Message, MessageEmbed } from 'discord.js'
import { RedditImage } from '@aero/ksoft'

@ApplyOptions<NorthCommandOptions>({
	name: 'notraps',
	aliases: ['trap'],
	description: 'Returns a Image from r/NoTraps',
	cooldownLimit: 3,
	nsfw: true,
	cooldownDelay: 2000
})
export default class NOTRAPS extends NorthCommand {
	public async run (message: Message): Promise<Message> {
		const { url, post }: RedditImage = await this.container.client.ksoft.images.reddit('NoTRaps', { span: 'day', removeNSFW: false })
		const embed = new MessageEmbed()
			.setTitle(post.title)
			.setFooter(`Powered by api.ksoft.si ${post.author} | Upvotes: ${post.upvotes} | Downvotes ${post.downvotes}`)
			.setURL(post.link)
			.setColor('WHITE')
			.setTimestamp()
			.setImage(url)
		return await message.channel.send(embed)
	}
}

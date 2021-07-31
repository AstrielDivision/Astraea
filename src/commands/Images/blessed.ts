import { AstraeaCommand, AstraeaCommandOptions } from '../../lib/Structures/Command'
import { Message, MessageEmbed } from 'discord.js'
import { ApplyOptions } from '@sapphire/decorators'
import { RedditImage } from '@aero/ksoft'

@ApplyOptions<AstraeaCommandOptions>({
	name: 'blessed',
	description: 'Returns an image from r/blessedimages'
})
export default class Blessed extends AstraeaCommand {
	public async run (message: Message): Promise<Message> {
		const { post, url }: RedditImage = await this.container.client.ksoft.images.reddit('blessedimages', { removeNSFW: true, span: 'day' })
		const embed = new MessageEmbed()
			.setTitle(post.title)
			.setFooter(`Powered by api.ksoft.si ${post.author} | Upvotes: ${post.upvotes} | Downvotes ${post.downvotes}`)
			.setURL(post.link)
			.setTimestamp()
			.setImage(url)
			.setColor('DARK_GREEN')
		return await message.channel.send(embed)
	}
}

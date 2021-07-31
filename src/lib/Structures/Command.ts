import { Command, CommandOptions, PieceContext } from '@sapphire/framework'
import { ColorResolvable, Message, MessageEmbed } from 'discord.js'
import { RedditImage } from '@aero/ksoft'
import { sep } from 'path'

export abstract class AstraeaCommand extends Command {
	visible?: boolean
	constructor (Context: PieceContext, options: CommandOptions) {
		super(Context, options)

		this.visible = false
	}

	public get category (): string {
		const path = this.path

		const splittedPath = path.split(sep)
		const finalPath = splittedPath.slice(splittedPath.indexOf('commands') + 1, -1)

		return finalPath[0]
	}
}

export abstract class AstraeaRedditCommand extends AstraeaCommand {
	subreddit: string
	colour: ColorResolvable
	nsfw: boolean
	constructor ({ subreddit, nsfw, colour }: { subreddit: string, nsfw: boolean, colour: string}, Context: PieceContext, options: AstraeaCommandOptions) {
		super(Context, options)
		this.subreddit = subreddit
		this.colour = colour
		this.nsfw = nsfw
	}

	public async run (message: Message): Promise<Message> {
		const { post, url }: RedditImage = await this.container.client.ksoft.images.reddit(this.subreddit, { removeNSFW: !this.nsfw, span: 'week' })
		const embed = new MessageEmbed()
			.setTitle(post.title)
			.setFooter(`Powered by api.ksoft.si ${post.author} | Upvotes: ${post.upvotes} | Downvotes ${post.downvotes}`)
			.setURL(post.link)
			.setTimestamp()
			.setImage(url)
			.setColor(this.colour)
		return await message.channel.send(embed)
	}
}

export interface AstraeaCommandOptions extends CommandOptions {
}

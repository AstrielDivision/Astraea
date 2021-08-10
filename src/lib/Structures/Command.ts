import { Command, CommandOptions, PieceContext, Args } from '@sapphire/framework'
import { ColorResolvable, Message, MessageEmbed, MessageAttachment } from 'discord.js'
import canvas from '../Canvas-SRA/requests'
import { RedditImage } from '@aero/ksoft'
import { sep } from 'path'

export abstract class AstraeaCommand extends Command {
	public usage?: string
	constructor (Context: PieceContext, options: AstraeaCommandOptions) {
		super(Context, options)

		this.usage = `${this.name} ${options.usage ?? ''}`
	}

	public get category (): string {
		const path = this.path

		const splittedPath = path.split(sep)
		const finalPath = splittedPath.slice(
			splittedPath.indexOf('commands') + 1,
			-1
		)

		return finalPath[0]
	}
}

export abstract class AstraeaRedditCommand extends AstraeaCommand {
	subreddit: string
	colour: ColorResolvable
	nsfw: boolean
	constructor (
		{
			subreddit,
			nsfw,
			colour
		}: { subreddit: string, nsfw: boolean, colour: string },
		Context: PieceContext,
		options: AstraeaCommandOptions
	) {
		super(Context, options)
		this.subreddit = subreddit
		this.colour = colour
		this.nsfw = nsfw
	}

	public async run (message: Message): Promise<Message> {
		const {
			post,
			url
		}: RedditImage = await this.container.client.ksoft.images.reddit(
			this.subreddit,
			{ removeNSFW: !this.nsfw, span: 'week' }
		)
		const embed = new MessageEmbed()
			.setTitle(post.title)
			.setFooter(
				`Powered by api.ksoft.si ${post.author} | Upvotes: ${post.upvotes} | Downvotes ${post.downvotes}`
			)
			.setURL(post.link)
			.setTimestamp()
			.setImage(url)
			.setColor(this.colour)
		return await message.channel.send(embed)
	}
}

export abstract class AstraeaOverlayCommand extends AstraeaCommand {
	overlay: 'gay' | 'glass' | 'wasted' | 'passed' | 'jail' | 'comrade' | 'triggered'
	constructor (
		{
			overlay
		}: { overlay: 'gay' | 'glass' | 'wasted' | 'passed' | 'jail' | 'comrade' | 'triggered' },
		Context: PieceContext,
		options: AstraeaCommandOptions
	) {
		super(Context, options)
		this.overlay = overlay
	}

	public async run (message: Message, args: Args): Promise<Message> {
		let buffer: Buffer
		const mention = (await args.pickResult('user')).value

		const wait = await message.channel.send('Please wait...')

		if (mention) {
			buffer = await canvas(this.overlay, mention.avatarURL({ format: 'png', size: 256 }))

			const image = new MessageAttachment(buffer, 'img.png')

			await message.channel.send({ files: [image] })
			return await wait.delete()
		}

		buffer = await canvas(this.overlay, message.author.avatarURL({ format: 'png', size: 256 }))

		const image = new MessageAttachment(buffer, 'img.png')

		await message.channel.send({ files: [image] })
		return await wait.delete()
	}
}

export interface AstraeaCommandOptions extends CommandOptions {
	usage?: string
}

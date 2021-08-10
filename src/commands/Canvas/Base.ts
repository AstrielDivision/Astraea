import { Args, PieceContext } from '@sapphire/framework'
import { Message, MessageAttachment } from 'discord.js'
import { AstraeaCommand, AstraeaCommandOptions } from 'lib/Structures/Command'
import canvas from '../../lib/Canvas-SRA/requests'

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

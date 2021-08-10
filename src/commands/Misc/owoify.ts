import { AstraeaCommand, AstraeaCommandOptions } from '../../lib/Structures/Command'
import { Message } from 'discord.js'
import { ApplyOptions } from '@sapphire/decorators'
import { Args } from '@sapphire/framework'
import owoify from 'owoify-js'

@ApplyOptions<AstraeaCommandOptions>({
	name: 'owoify',
	description: 'owoify your text',
	flags: ['uwu', 'uvu'],
	usage: '<text> [--uwu | --uvu]'
})
export default class OwOify extends AstraeaCommand {
	public async run (message: Message, args: Args): Promise<Message> {
		const text = (await args.pickResult('string')).value
		const uvuFlag = args.getFlags('uvu')
		const uwuFlag = args.getFlags('uwu')

		if (!text) {
			return await message.channel.send('No text provided!')
		}

		if (uvuFlag) return await this.uvu(message, text)
		if (uwuFlag) return await this.uwu(message, text)
		return await this.owo(message, text)
	}

	private async uvu (message: Message, text: string): Promise<Message> {
		const uvuifed = owoify(text, 'uvu')

		return await message.channel.send(uvuifed)
	}

	private async uwu (message: Message, text: string): Promise<Message> {
		const uwuifed = owoify(text, 'uwu')

		return await message.channel.send(uwuifed)
	}

	private async owo (message: Message, text: string): Promise<Message> {
		const owoified = owoify(text)

		return await message.channel.send(owoified)
	}
}

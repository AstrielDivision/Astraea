import { AstraeaCommand, AstraeaCommandOptions } from '../../lib/Structures/Command'
import { Message } from 'discord.js'
import { ApplyOptions } from '@sapphire/decorators'
import { Args } from '@sapphire/framework'
import owoify from 'owoify-js'

@ApplyOptions<AstraeaCommandOptions>({
	name: 'owoify',
	description: 'owoify your text',
	flags: ['uwu', 'uvu']
})
export default class example extends AstraeaCommand {
	public async run (message: Message, args: Args): Promise<Message> {
		const text = (await args.pickResult('string')).value
		const uvuFlag = args.getFlags('uvu')
		const uwuFlag = args.getFlags('uwu')

		if (!text) {
			return await message.channel.send('No text provided!')
		}

		if (uvuFlag) return await this.uvu(message, text)
		if (uwuFlag) return await this.uwu(message, text)

		const owoified = owoify(text)

		return await message.channel.send(owoified)
	}

	private async uvu (message: Message, text: string): Promise<Message> {
		const uvuifed = owoify(text, 'uvu')

		return await message.channel.send(uvuifed)
	}

	private async uwu (message: Message, text: string): Promise<Message> {
		const uwuifed = owoify(text, 'uwu')

		return await message.channel.send(uwuifed)
	}
}

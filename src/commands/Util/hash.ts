import { AstraeaCommand, AstraeaCommandOptions } from '../../lib/Structures/Command'
import { Message } from 'discord.js'
import { ApplyOptions } from '@sapphire/decorators'
import { Args } from '@sapphire/framework'
import * as crypto from 'crypto'

@ApplyOptions<AstraeaCommandOptions>({
	name: 'hash',
	description: 'Hash your text in sha1',
	detailedDescription: 'Hash your text in either sha1, sha256, sha512 or md5',
	flags: ['sha1', 'sha256', 'sha512', 'md5']
})
export default class Hash extends AstraeaCommand {
	public async run (message: Message, args: Args): Promise<Message> {
		const sha1Flag = args.getFlags('sha1')
		const sha256Flag = args.getFlags('sha256')
		const sha512Flag = args.getFlags('sha512')
		const md5Flag = args.getFlags('md5')

		const text = (await args.restResult('string')).value

		if (!text) return await message.channel.send('No text provided!')

		if (sha1Flag) return await this.sha1(message, text)
		if (sha256Flag) return await this.sha256(message, text)
		if (sha512Flag) return await this.sha512(message, text)
		if (md5Flag) return await this.md5(message, text)

		return await message.channel.send('You must provide one of these flags:\n--sha1\n--sha256\n--sha512\n--md5')
	}

	private hash (str: string, algorithm: 'sha1' | 'sha256' | 'sha512' | 'md5'): string {
		return crypto.createHash(algorithm).update(str).digest('hex')
	}

	private async sha1 (message: Message, text: string): Promise<Message> {
		const hashed = this.hash(text, 'sha1')

		return await message.channel.send(hashed)
	}

	private async sha256 (message: Message, text: string): Promise<Message> {
		const hashed = this.hash(text, 'sha256')

		return await message.channel.send(hashed)
	}

	private async sha512 (message: Message, text: string): Promise<Message> {
		const hashed = this.hash(text, 'sha512')

		return await message.channel.send(hashed)
	}

	private async md5 (message: Message, text: string): Promise<Message> {
		const hashed = this.hash(text, 'md5')

		return await message.channel.send(hashed)
	}
}

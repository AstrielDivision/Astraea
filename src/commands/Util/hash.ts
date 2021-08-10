import { ApplyOptions } from '@sapphire/decorators'
import { Args } from '@sapphire/framework'
import * as crypto from 'crypto'
import { Message } from 'discord.js'
import { AstraeaCommand, AstraeaCommandOptions } from '../../lib/Structures/Command'

@ApplyOptions<AstraeaCommandOptions>({
	name: 'hash',
	description: 'Hash your text in sha1',
	detailedDescription: 'Hash your text in either sha1, sha256, sha512 or md5',
	flags: ['sha1', 'sha256', 'sha512', 'md5']
})
export default class Hash extends AstraeaCommand {
	public static hash (str: string, algorithm: 'sha1' | 'sha256' | 'sha512' | 'md5'): string {
		return crypto.createHash(algorithm).update(str).digest('hex')
	}

	public async run (message: Message, args: Args): Promise<Message> {
		const sha1Flag = args.getFlags('sha1')
		const sha256Flag = args.getFlags('sha256')
		const sha512Flag = args.getFlags('sha512')
		const md5Flag = args.getFlags('md5')

		const text = (await args.restResult('string')).value

		if (!text) return await message.channel.send('No text provided!')

		if (!sha1Flag && !sha256Flag && !sha512Flag && !md5Flag) {
			return await message.channel.send('You must provide at least one of these flags:\n--sha1\n--sha256\n--sha512\n--md5')
		}

		let response = `Hash value(s) of: ${text}`

		if (md5Flag) response += `\nMD5: ${Hash.hash(text, 'md5')}`
		if (sha1Flag) response += `\nSHA1: ${Hash.hash(text, 'sha1')}`
		if (sha256Flag) response += `\nSHA256: ${Hash.hash(text, 'sha256')}`
		if (sha512Flag) response += `\nSHA512: ${Hash.hash(text, 'sha512')}`

		return await message.channel.send(response)
	}
}

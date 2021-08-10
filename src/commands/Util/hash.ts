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

		/*
			Hash value(s) of: ABC
			---
			MD5    : 902fbdd2b1df0c4f70b4a5d23525e932
			SHA1   : 3c01bdbb26f358bab27f267924aa2c9a03fcfdb8
			SHA256 : b5d4045c3f466fa91fe2cc6abe79232a1a57cdf104f7a26e716e0a1e2789df78
			SHA512 : 397118fdac8d83ad98813c50759c85b8c47565d8268bf10da483153b747a74743a58a90e85aa9f705ce6984ffc128db567489817e4092d050d8a1cc596ddc119
		*/

		let response = '```md\n' +
			`Hash value(s) of: ${text}\n` +
			'---'

		/* eslint-disable no-multi-spaces */
		if (md5Flag)    response += `\nMD5    : ${Hash.hash(text, 'md5')}`
		if (sha1Flag)   response += `\nSHA1   : ${Hash.hash(text, 'sha1')}`
		if (sha256Flag) response += `\nSHA256 : ${Hash.hash(text, 'sha256')}`
		if (sha512Flag) response += `\nSHA512 : ${Hash.hash(text, 'sha512')}`
		/* eslint-enable no-multi-spaces */

		response += '\n```'

		return await message.channel.send(response)
	}
}

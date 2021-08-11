import { AstraeaCommand, AstraeaCommandOptions } from '../../lib/Structures/Command'
import { Message } from 'discord.js'
import { ApplyOptions } from '@sapphire/decorators'
import { Args } from '@sapphire/framework'
import crypto from 'crypto-js'

@ApplyOptions<AstraeaCommandOptions>({
	name: 'rc4',
	aliases: ['rc4drop'],
	description: 'Encrypt messages by using the RC4Drop cipher or decrypt RC4Drop encrypted messages',
	usage: '<text> <--secret=<randomLetters> or -s=<randomLetters>>',
	options: ['secret', 's'],
	flags: ['d', 'decrypt']
})
export default class RC4Drop extends AstraeaCommand {
	public async run (message: Message, args: Args): Promise<Message> {
		const decryptFlags = args.getFlags('d', 'decrypt')
		const text = (await args.restResult('string')).value
		const secret = args.getOption('s', 'secret')

		if (!text) return await message.channel.send('No text provided')
		if (!secret) return await message.channel.send('No secret provided. (Hint: Use -s=<randomLetters> or --secret=<randomLetters>)')

		if (decryptFlags) return await this.decrypt(message, text, secret).catch(async () => await message.channel.send('Couldn\'t decrypt this text!'))
		return await this.encrypt(message, text, secret)
	}

	/**
	 * Input: ABC
	 * Secret: ABC
	 * Output: U2FsdGVkX1/64CRgHLq4o4+2uPg=
	 */
	private async encrypt (message: Message, input: string, secret: string): Promise<Message> {
		const encrypted = crypto.RC4Drop.encrypt(input, secret)

		return await message.channel.send(encrypted.toString())
	}

	/**
	 * Input: U2FsdGVkX1/64CRgHLq4o4+2uPg=
	 * Secret: ABC
	 * Output: ABC
	 */
	private async decrypt (message: Message, input: string, secret: string): Promise<Message> {
		const bytes = crypto.RC4Drop.decrypt(input, secret)
		const decrypted = bytes.toString(crypto.enc.Utf8)

		return await message.channel.send(decrypted.toString())
	}
}

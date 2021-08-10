import { AstraeaCommand, AstraeaCommandOptions } from '../../lib/Structures/Command'
import { Message } from 'discord.js'
import { ApplyOptions } from '@sapphire/decorators'
import { Args } from '@sapphire/framework'
import crypto from 'crypto-js'

@ApplyOptions<AstraeaCommandOptions>({
	name: 'aes',
	description: 'Encrypt or Decrypt AES encrypted messages',
	flags: ['d', 'decrypt'],
	options: ['secret', 's'],
	usage: 'aes <text> <-s=randomLetters | --secret=randomLetters> [-d | --decrypt]'
})
export default class AES extends AstraeaCommand {
	public async run (message: Message, args: Args): Promise<Message> {
		const decryptFlags = args.getFlags('d', 'decrypt')
		const text = (await args.restResult('string')).value
		const secret = args.getOption('s', 'secret')

		if (!text) return await message.channel.send('No text provided')
		if (!secret) return await message.channel.send('No secret provided. (Hint: Use -s=<randomLetters> or --secret=<randomLetters>)')

		if (decryptFlags) return await this.decrypt(message, text, secret)
		return await this.encrypt(message, text, secret)
	}

	private async encrypt (message: Message, input: string, secret: string): Promise<Message> {
		const encrypted = crypto.AES.encrypt(input, secret)

		return await message.channel.send(encrypted.toString())
	}

	private async decrypt (message: Message, input: string, secret: string): Promise<Message> {
		const bytes = crypto.AES.decrypt(input, secret)
		const decrypted = bytes.toString(crypto.enc.Utf8)

		return await message.channel.send(decrypted.toString())
	}
}

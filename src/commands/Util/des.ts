import { AstraeaCommand, AstraeaCommandOptions } from '../../lib/Structures/Command'
import { Message } from 'discord.js'
import { ApplyOptions } from '@sapphire/decorators'
import { Args } from '@sapphire/framework'
import crypto from 'crypto-js'

@ApplyOptions<AstraeaCommandOptions>({
	name: 'des',
	description: 'Encrypt a message with DES or decrypt a DES message',
	usage: '[optional] <required>',
	options: ['secret', 's'],
	flags: ['d', 'decrypt']
})
export default class DES extends AstraeaCommand {
	public async run (message: Message, args: Args): Promise<Message> {
		const text = (await args.restResult('string')).value
		const secret = args.getOption('secret', 's')
		const decryptFlag = args.getFlags('decrypt', 'd')

		if (!text) return await message.channel.send('No text provided.')
		if (!secret) return await message.channel.send('No secret provided. (Hint: use --secret=<randomText> or -s=<randomText>)')

		if (decryptFlag) return await this.Decrypt(message, text, secret)
		return await this.Encrypt(message, text, secret)
	}

	private async Encrypt (message: Message, text: string, secret: string): Promise<Message> {
		const encrypted = crypto.DES.encrypt(text, secret).toString()

		return await message.channel.send(encrypted)
	}

	private async Decrypt (message: Message, text: string, secret: string): Promise<Message> {
		const bytes = crypto.DES.decrypt(text, secret)
		const decrypted = bytes.toString(crypto.enc.Utf8)

		return await message.channel.send(decrypted.toString())
	}
}

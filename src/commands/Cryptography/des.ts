import { AstraeaCommand, AstraeaCommandOptions } from '../../lib/Structures/Command'
import { Message } from 'discord.js'
import { ApplyOptions } from '@sapphire/decorators'
import { Args } from '@sapphire/framework'
import crypto from 'crypto-js'

@ApplyOptions<AstraeaCommandOptions>({
	name: 'des',
	description: 'Encrypt a message with DES or decrypt a DES message',
	usage: '<text> <--secret=<randomLetters> or -s=<randomLetters>> [--triple or -t]',
	options: ['secret', 's'],
	flags: ['d', 'decrypt', 'triple', 't']
})
export default class DES extends AstraeaCommand {
	public async run (message: Message, args: Args): Promise<Message> {
		const text = (await args.restResult('string')).value
		const secret = args.getOption('secret', 's')
		const decryptFlag = args.getFlags('decrypt', 'd')
		const tripleFlag = args.getFlags('triple', 't')

		if (!text) return await message.channel.send('No text provided.')
		if (!secret) return await message.channel.send('No secret provided. (Hint: use --secret=<randomText> or -s=<randomText>)')

		if (decryptFlag) return await this.Decrypt(message, text, secret, tripleFlag).catch(async () => await message.channel.send('Decryption unsuccessful!'))
		return await this.Encrypt(message, text, secret, tripleFlag)
	}

	/**
	 * * Normal
	 * ---
	 * Input: ABC
	 * Secret: ABC
	 * Output: U2FsdGVkX18hSOfJV6V+HZyx7Pt6sw9H
	 * ---
	 *  * TripleDES
	 * ---
	 * Input: ABC
	 * Secret: ABC
	 * Output: U2FsdGVkX1/JdlBm8M+tXszBgkrIzCjX (Output may vary)
	 */
	private async Encrypt (message: Message, text: string, secret: string, triple?: boolean): Promise<Message> {
		let encrypted: string

		// DES is applied 3 times. It is believed that it is secure in this form
		if (triple) {
			encrypted = crypto.TripleDES.encrypt(text, secret).toString()
		} else {
			encrypted = crypto.DES.encrypt(text, secret).toString()
		}

		return await message.channel.send(encrypted)
	}

	/**
	 * Normal
	 * ---
	 * Input: ABC
	 * Secret: ABC
	 * Output: U2FsdGVkX18hSOfJV6V+HZyx7Pt6sw9H
	 * ---
	 * TripleDES
	 * ---
	 * Input: U2FsdGVkX1/JdlBm8M+tXszBgkrIzCjX
	 * Secret: ABC
	 * Output: ABC
	 */
	private async Decrypt (message: Message, text: string, secret: string, triple?: boolean): Promise<Message> {
		let bytes = crypto.DES.decrypt(text, secret)
		let decrypted = bytes.toString(crypto.enc.Utf8)

		if (triple) {
			bytes = crypto.TripleDES.decrypt(text, secret)
			decrypted = bytes.toString(crypto.enc.Utf8)
		}

		return await message.channel.send(decrypted.toString())
	}
}

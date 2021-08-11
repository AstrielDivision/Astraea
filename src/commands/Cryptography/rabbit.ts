import { AstraeaCommand, AstraeaCommandOptions } from '../../lib/Structures/Command'
import { Message } from 'discord.js'
import { ApplyOptions } from '@sapphire/decorators'
import { Args } from '@sapphire/framework'
import crypto from 'crypto-js'

@ApplyOptions<AstraeaCommandOptions>({
	name: 'rabbit',
	description: 'Encrypt text with the Rabbit Cipher or decrypt Rabbit encrypted text',
	usage: '<text> <-s=<randomLetters> or --secret=<randomLetters>>',
	options: ['secret', 's'],
	flags: ['d', 'decrypt']
})
export default class Rabbit extends AstraeaCommand {
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
	 * Output: U2FsdGVkX1+dH8sIK4GYwBDZ2o0=
	 */
	private async encrypt (message: Message, input: string, secret: string): Promise<Message> {
		const encrypted = crypto.Rabbit.encrypt(input, secret).toString()

		return await message.channel.send(encrypted)
	}

	/**
	 * Input: U2FsdGVkX1+dH8sIK4GYwBDZ2o0=
	 * Secret: ABC
	 * Output: ABC
	 */
	private async decrypt (message: Message, input: string, secret: string): Promise<Message> {
		const bytes = crypto.Rabbit.decrypt(input, secret)
		const decrypted = bytes.toString(crypto.enc.Utf8).toString()

		return await message.channel.send(decrypted.toString())
	}
}

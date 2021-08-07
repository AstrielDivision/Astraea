import { AstraeaCommand, AstraeaCommandOptions } from '../../lib/Structures/Command'
import { Message } from 'discord.js'
import { ApplyOptions } from '@sapphire/decorators'
import { Args } from '@sapphire/framework'

@ApplyOptions<AstraeaCommandOptions>({
	name: 'base64',
	description: 'Encode text to base64 or Decode base64 to text',
	flags: ['d', 'decode']
})
export default class example extends AstraeaCommand {
	public async run (message: Message, args: Args): Promise<Message> {
		const string = (await args.restResult('string')).value
		const decode = args.getFlags('d', 'decode')

		if (!string) return await message.channel.send('You didn\'t provide a string!')

		if (decode) {
			const decoded = Buffer.from(string, 'base64').toString('binary')

			return await message.channel.send(decoded)
		}

		const encoded = Buffer.from(string, 'binary').toString('base64')

		return await message.channel.send(encoded)
	}
}

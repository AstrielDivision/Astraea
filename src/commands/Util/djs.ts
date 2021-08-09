import { AstraeaCommand, AstraeaCommandOptions } from '../../lib/Structures/Command'
import { Message } from 'discord.js'
import { ApplyOptions } from '@sapphire/decorators'
import { Args } from '@sapphire/framework'
import { FetchResultTypes } from '@sapphire/fetch'

@ApplyOptions<AstraeaCommandOptions>({
	name: 'djs',
	aliases: ['docs'],
	description: 'Search discord.js documentation'
})
export default class example extends AstraeaCommand {
	public async run (message: Message, args: Args): Promise<Message> {
		const query = (await args.pickResult('string')).value

		if (!query) return await message.channel.send('No query provided')

		const data = await this.container.client.util.Fetch(`https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(query)}`, FetchResultTypes.JSON)

		return await message.channel.send({ embed: data })
	}
}
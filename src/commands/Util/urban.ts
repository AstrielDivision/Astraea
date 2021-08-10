import { AstraeaCommand, AstraeaCommandOptions } from '../../lib/Structures/Command'
import { Message, MessageEmbed } from 'discord.js'
import { ApplyOptions } from '@sapphire/decorators'
import { Args } from '@sapphire/framework'
import Urban from '../../lib/UrbanFetch'

@ApplyOptions<AstraeaCommandOptions>({
	name: 'urban',
	description: 'Get definitions of things on the trusty Urban Dictionary',
	nsfw: true,
	usage: '<word>'
})
export default class UrbanDictionary extends AstraeaCommand {
	public async run (message: Message, args: Args): Promise<Message> {
		const search = (await args.pickResult('string')).value

		if (!search) return await message.channel.send('No search provided')

		const word = await Urban(search)
		const embed = new MessageEmbed()
			.setTitle(word.word)
			.setDescription(word.definition)
			.addField('Example', word.example)
			.setURL(word.permalink)
			.setFooter(`Author: ${word.author} | ID: ${word.defid} | Upvotes: ${word.thumbs_up} | Downvotes: ${word.thumbs_down}`)

		return await message.channel.send(embed)
	}
}

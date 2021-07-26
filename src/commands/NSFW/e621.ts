import { NorthCommand, NorthCommandOptions } from '../../lib/Structures/Command'
import { ApplyOptions } from '@sapphire/decorators'
import { Message, MessageEmbed } from 'discord.js'
import Yiff from '../../lib/Structures/Yiff'
import { Args } from '@sapphire/framework'

@ApplyOptions<NorthCommandOptions>({
	name: 'e621',
	aliases: ['621'],
	description: 'Returns an Image from e621 with your selected tags',
	cooldownLimit: 3,
	nsfw: true,
	cooldownDelay: 3000
})
export default class E621 extends NorthCommand {
	public async run (message: Message, args: Args): Promise<Message> {
		const Tags = (await args.restResult('string')).value
		try {
			if (!Tags) return await message.channel.send('No tags were specified')
			const req: YiffStruct = await Yiff.e621(Tags, 1)

			const embed = new MessageEmbed()
				.setTitle('Source')
			// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
				.setURL(`https://e621.net/posts/${req[0].id}`)
				.setImage(req[0].file.url)
				// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
				.setFooter(`Artist(s): ${req[0].tags.artist} | Ups: ${req[0].score.up} | Downs ${req[0].score.down} | Total Score: ${req[0].score.total}`)
				.setColor('RANDOM')
			// eslint-disable-next-line @typescript-eslint/restrict-plus-operands
			if (req[0].tags.lore.length > 0) embed.setDescription('`[LORE]`' + req[0].tags.lore)

			return await message.channel.send(embed)
		} catch (e) {
			return await message.channel.send(e.message)
		}
	}
}

interface YiffFile {
	wifth: number
	height: number
	url: string
}
interface YiffScore {
	ups: number
	downs: number
	total: number
}
interface YiffTags {
	general: string[]
	species: string[]
	character: string[]
	copyright: string[]
	artist: string[]
	invalid: string[]
	lore: string[]
}
interface YiffStruct {
	id: number
	file: YiffFile
	score: YiffScore
	tags: YiffTags
	rating: string
	sources: string[]
}

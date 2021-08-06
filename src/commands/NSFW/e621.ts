import {
	AstraeaCommand,
	AstraeaCommandOptions
} from '../../lib/Structures/Command'
import { ApplyOptions } from '@sapphire/decorators'
import { Message, MessageEmbed } from 'discord.js'
import Yiff from '../../lib/yiff.ts/Yiff'
import { Args } from '@sapphire/framework'

@ApplyOptions<AstraeaCommandOptions>({
	name: 'e621',
	aliases: ['621'],
	description: 'Returns an Image from e621 with your selected tags',
	detailedDescription:
    'Returns an Image from e621. Use --results=[number] or -r=[number] if you wish to have more than one image',
	cooldownLimit: 2,
	nsfw: true,
	cooldownDelay: 5000,
	options: ['results', 'r']
})
export default class E621 extends AstraeaCommand {
	public async run (message: Message, args: Args): Promise<Message> {
		const Tags = (await args.restResult('string')).value
		const resOption = args.getOption('results', 'r')
		const res = parseInt(resOption)
		if (!Tags) return await message.channel.send('No tags were specified')
		if (res > 10) {
			return await message.channel.send(
				'The amount of results is currently limited to 10'
			)
		}

		const req: YiffStruct[] = await Yiff.e621(Tags, res)

		for await (let re of req) {
			const embed = new MessageEmbed()
				.setTitle('Source')
				.setURL(`https://e621.net/posts/${re.id}`)
				.setImage(re.file.url)
				.setFooter(
					`Artist(s): ${re.tags.artist.join(', ')} | Ups: ${
						re.score.up
					} | Downs ${re.score.down} | Total Score: ${re.score.total}`
				)
				.setColor('RANDOM')
			if (re.tags.lore.length > 0) embed.setDescription(re.tags.lore)

			await message.channel.send(embed)
		}
	}
}

interface YiffFile {
	wifth: number
	height: number
	url: string
}
interface YiffScore {
	up: number
	down: number
	total: number
}
interface YiffTags {
	general: string[]
	species: string[]
	character: string[]
	copyright: string[]
	artist: string[]
	invalid: string[]
	lore?: string[]
}
interface YiffStruct {
	id: number
	file: YiffFile
	score: YiffScore
	tags: YiffTags
	rating: string
	sources: string[]
}

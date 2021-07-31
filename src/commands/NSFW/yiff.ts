import { AstraeaCommand, AstraeaCommandOptions } from '../../lib/Structures/Command'
import { ApplyOptions } from '@sapphire/decorators'
import { Message, MessageEmbed } from 'discord.js'
import Yiff from '../../lib/Structures/Yiff'
import { Args } from '@sapphire/framework'

@ApplyOptions<AstraeaCommandOptions>({
	name: 'yiff',
	aliases: ['yiff', 'floofydev'],
	description: 'Returns an Image from api.floofy.dev with your selected tags',
	cooldownLimit: 6,
	nsfw: true,
	cooldownDelay: 5000,
	options: ['results', 'r']
})
export default class YiffFloofyDev extends AstraeaCommand {
	public async run (message: Message, args: Args): Promise<Message> {
		const req: Request = await Yiff.floofy()

		const embed = new MessageEmbed()
			.setImage(req.url)
			.setColor('RANDOM')

		return await message.channel.send(embed)
	}
}

interface Request {
	url: string
}

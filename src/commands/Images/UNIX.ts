import { AstraeaRedditCommand, AstraeaCommandOptions } from '../../lib/Structures/Command'
import { PieceContext } from '@sapphire/framework'
import { ApplyOptions } from '@sapphire/decorators'

@ApplyOptions<AstraeaCommandOptions>({
	name: 'unix',
	aliases: ['linx'],
	description: 'Returns a Image from r/UNIXPorn',
	cooldownLimit: 3,
	cooldownDelay: 2000
})
export default class UNIXPorn extends AstraeaRedditCommand {
	constructor (Context: PieceContext, options: AstraeaCommandOptions) {
		super({ subreddit: 'UNIXPorn', nsfw: false, colour: 'BLACK' }, Context, options)
	}
}

import { ApplyOptions } from '@sapphire/decorators'
import { PieceContext } from '@sapphire/framework'
import { AstraeaCommandOptions } from '../../lib/Structures/Command'
import { AstraeaRedditCommand } from './Base'

@ApplyOptions<AstraeaCommandOptions>({
	name: 'unix',
	aliases: ['linux'],
	description: 'Returns a Image from r/UNIXPorn',
	cooldownLimit: 3,
	cooldownDelay: 2000
})
export default class UNIXPorn extends AstraeaRedditCommand {
	constructor (Context: PieceContext, options: AstraeaCommandOptions) {
		super(
			{ subreddit: 'UNIXPorn', nsfw: false, colour: 'BLACK' },
			Context,
			options
		)
	}
}
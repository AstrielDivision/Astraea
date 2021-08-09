import {
	AstraeaRedditCommand,
	AstraeaCommandOptions
} from '../../lib/Structures/Command'
import { PieceContext } from '@sapphire/framework'
import { ApplyOptions } from '@sapphire/decorators'

@ApplyOptions<AstraeaCommandOptions>({
	name: 'dankmeme',
	aliases: ['dankmemes'],
	description: 'Returns a Image from r/dankmemes',
	cooldownLimit: 3,
	cooldownDelay: 2000
})
export default class DankMemes extends AstraeaRedditCommand {
	constructor (Context: PieceContext, options: AstraeaCommandOptions) {
		super(
			{ subreddit: 'dankmemes', nsfw: false, colour: 'DARK_GREEN' },
			Context,
			options
		)
	}
}

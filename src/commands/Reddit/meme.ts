import { ApplyOptions } from '@sapphire/decorators'
import { PieceContext } from '@sapphire/framework'
import { AstraeaCommandOptions } from '../../lib/Structures/Command'
import { AstraeaRedditCommand } from './Base'

@ApplyOptions<AstraeaCommandOptions>({
	name: 'meme',
	aliases: ['memes'],
	description: 'Returns a Image from r/memes',
	cooldownLimit: 3,
	cooldownDelay: 2000
})
export default class Memes extends AstraeaRedditCommand {
	constructor (Context: PieceContext, options: AstraeaCommandOptions) {
		super(
			{ subreddit: 'memes', nsfw: false, colour: 'DARK_GREEN' },
			Context,
			options
		)
	}
}

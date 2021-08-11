import { ApplyOptions } from '@sapphire/decorators'
import { PieceContext } from '@sapphire/framework'
import { AstraeaCommandOptions } from '../../lib/Structures/Command'
import { AstraeaRedditCommand } from '../../lib/Structures/commands/RedditCommand'

@ApplyOptions<AstraeaCommandOptions>({
	name: 'astrophotography',
	aliases: ['astronomy', 'astrophotography', 'astro'],
	description: 'Returns a Image from r/astrophotography',
	cooldownLimit: 3,
	cooldownDelay: 2000
})
export default class Memes extends AstraeaRedditCommand {
	constructor (Context: PieceContext, options: AstraeaCommandOptions) {
		super({ subreddit: 'astrophotography', nsfw: false, colour: 'BLACK' }, Context, options)
	}
}

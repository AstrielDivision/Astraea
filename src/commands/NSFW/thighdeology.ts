import { ApplyOptions } from '@sapphire/decorators'
import { PieceContext } from '@sapphire/framework'
import { AstraeaCommandOptions } from '../../lib/Structures/Command'
import { AstraeaRedditCommand } from '../../lib/Structures/commands/RedditCommand'

@ApplyOptions<AstraeaCommandOptions>({
	name: 'thigh',
	aliases: ['thighs', 'thighdeology'],
	description: 'Returns a Image from r/thighdeology',
	cooldownLimit: 3,
	nsfw: true,
	cooldownDelay: 2000
})
export default class Thighdeology extends AstraeaRedditCommand {
	constructor (Context: PieceContext, options: AstraeaCommandOptions) {
		super({ subreddit: 'thighdeology', nsfw: true, colour: 'BLACK' }, Context, options)
	}
}

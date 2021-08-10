import { ApplyOptions } from '@sapphire/decorators'
import { PieceContext } from '@sapphire/framework'
import { AstraeaCommandOptions } from '../../lib/Structures/Command'
import { AstraeaRedditCommand } from '../Reddit/Base'

@ApplyOptions<AstraeaCommandOptions>({
	name: 'notraps',
	aliases: ['trap'],
	description: 'Returns a Image from r/NoTraps',
	cooldownLimit: 3,
	nsfw: true,
	cooldownDelay: 2000
})
export default class Femboy extends AstraeaRedditCommand {
	constructor (Context: PieceContext, options: AstraeaCommandOptions) {
		super(
			{ subreddit: 'NoTraps', nsfw: true, colour: 'PINK' },
			Context,
			options
		)
	}
}

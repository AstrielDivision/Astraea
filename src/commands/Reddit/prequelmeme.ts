import { ApplyOptions } from '@sapphire/decorators'
import { PieceContext } from '@sapphire/framework'
import { AstraeaCommandOptions } from '../../lib/Structures/Command'
import { AstraeaRedditCommand } from './Base'

@ApplyOptions<AstraeaCommandOptions>({
	name: 'prequelmemes',
	description: 'Returns a Image from r/prequelmemes',
	cooldownLimit: 3,
	cooldownDelay: 2000
})
export default class PrequelMemes extends AstraeaRedditCommand {
	constructor (Context: PieceContext, options: AstraeaCommandOptions) {
		super(
			{ subreddit: 'prequelmemes', nsfw: false, colour: 'BLUE' },
			Context,
			options
		)
	}
}

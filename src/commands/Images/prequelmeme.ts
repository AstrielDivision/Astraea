import {
	AstraeaRedditCommand,
	AstraeaCommandOptions
} from '../../lib/Structures/Command'
import { PieceContext } from '@sapphire/framework'
import { ApplyOptions } from '@sapphire/decorators'

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

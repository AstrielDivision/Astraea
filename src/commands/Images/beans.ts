import {
	AstraeaRedditCommand,
	AstraeaCommandOptions
} from '../../lib/Structures/Command'
import { PieceContext } from '@sapphire/framework'
import { ApplyOptions } from '@sapphire/decorators'

@ApplyOptions<AstraeaCommandOptions>({
	name: 'beans',
	description: 'Returns a Image from r/BeansInStrangePlaces',
	nsfw: false
})
export default class BeansInStrangePlaces extends AstraeaRedditCommand {
	constructor (Context: PieceContext, options: AstraeaCommandOptions) {
		super(
			{ subreddit: 'BeansInStrangePlaces', nsfw: false, colour: 'BROWN' },
			Context,
			options
		)
	}
}

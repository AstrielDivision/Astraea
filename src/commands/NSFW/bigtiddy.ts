import { ApplyOptions } from '@sapphire/decorators'
import { PieceContext } from '@sapphire/framework'
import { AstraeaCommandOptions } from '../../lib/Structures/Command'
import { AstraeaRedditCommand } from '../Reddit/Base'

@ApplyOptions<AstraeaCommandOptions>({
	name: 'bigtiddy',
	aliases: ['booba'],
	description: 'Returns a Image from r/bigtiddygothgf',
	cooldownLimit: 3,
	cooldownDelay: 2000,
	nsfw: true
})
export default class Femboy extends AstraeaRedditCommand {
	constructor (Context: PieceContext, options: AstraeaCommandOptions) {
		super(
			{ subreddit: 'bigtiddygothgf', nsfw: true, colour: 'PINK' },
			Context,
			options
		)
	}
}

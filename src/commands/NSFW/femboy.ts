import { ApplyOptions } from '@sapphire/decorators'
import { PieceContext } from '@sapphire/framework'
import { AstraeaCommandOptions } from '../../lib/Structures/Command'
import { AstraeaRedditCommand } from '../Reddit/Base'

@ApplyOptions<AstraeaCommandOptions>({
	name: 'femboy',
	aliases: ['femboy', 'femboys', 'femboi', 'fembois'],
	description: 'Returns a Image from r/FemBoys',
	nsfw: true
})
export default class Femboy extends AstraeaRedditCommand {
	constructor (Context: PieceContext, options: AstraeaCommandOptions) {
		super(
			{ subreddit: 'femboys', nsfw: true, colour: 'PINK' },
			Context,
			options
		)
	}
}

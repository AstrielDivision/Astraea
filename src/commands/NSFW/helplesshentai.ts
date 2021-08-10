import { ApplyOptions } from '@sapphire/decorators'
import { PieceContext } from '@sapphire/framework'
import { AstraeaCommandOptions } from '../../lib/Structures/Command'
import { AstraeaRedditCommand } from '../Reddit/Base'

@ApplyOptions<AstraeaCommandOptions>({
	name: 'helplesshentai',
	aliases: ['hh'],
	description: 'Returns a Image from r/helplesshentai',
	cooldownLimit: 3,
	cooldownDelay: 2000,
	nsfw: true
})
export default class HelplessHentai extends AstraeaRedditCommand {
	constructor (Context: PieceContext, options: AstraeaCommandOptions) {
		super(
			{ subreddit: 'helplesshentai', nsfw: true, colour: 'BLACK' },
			Context,
			options
		)
	}
}

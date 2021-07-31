import { AstraeaRedditCommand, AstraeaCommandOptions } from '../../lib/Structures/Command'
import { PieceContext } from '@sapphire/framework'
import { ApplyOptions } from '@sapphire/decorators'

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
		super({ subreddit: 'helplesshentai', nsfw: true, colour: 'BLACK' }, Context, options)
	}
}

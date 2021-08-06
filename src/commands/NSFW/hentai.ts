import {
	AstraeaRedditCommand,
	AstraeaCommandOptions
} from '../../lib/Structures/Command'
import { PieceContext } from '@sapphire/framework'
import { ApplyOptions } from '@sapphire/decorators'

@ApplyOptions<AstraeaCommandOptions>({
	name: 'hentai',
	aliases: ['hentai!'],
	description: 'Returns a Image from r/hentai',
	cooldownLimit: 3,
	nsfw: true,
	cooldownDelay: 2000
})
export default class Hentai extends AstraeaRedditCommand {
	constructor (Context: PieceContext, options: AstraeaCommandOptions) {
		super(
			{ subreddit: 'hentai', nsfw: true, colour: 'PINK' },
			Context,
			options
		)
	}
}

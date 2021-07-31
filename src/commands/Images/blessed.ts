import { AstraeaRedditCommand, AstraeaCommandOptions } from '../../lib/Structures/Command'
import { PieceContext } from '@sapphire/framework'
import { ApplyOptions } from '@sapphire/decorators'

@ApplyOptions<AstraeaCommandOptions>({
	name: 'blessed',
	description: 'Returns an image from r/blessedimages',
	cooldownLimit: 3,
	cooldownDelay: 2000
})
export default class Memes extends AstraeaRedditCommand {
	constructor (Context: PieceContext, options: AstraeaCommandOptions) {
		super({ subreddit: 'blessedimages', nsfw: false, colour: 'WHITE' }, Context, options)
	}
}

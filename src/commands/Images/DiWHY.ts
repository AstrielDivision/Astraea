import { AstraeaRedditCommand, AstraeaCommandOptions } from '../../lib/Structures/Command'
import { PieceContext } from '@sapphire/framework'
import { ApplyOptions } from '@sapphire/decorators'

@ApplyOptions<AstraeaCommandOptions>({
	name: 'diwhy',
	aliases: ['diy'],
	description: 'Returns a Image from r/DiWHY',
	nsfw: false
})
export default class DiWHY extends AstraeaRedditCommand {
	constructor (Context: PieceContext, options: AstraeaCommandOptions) {
		super({ subreddit: 'DiWHY', nsfw: false, colour: 'ORANGE' }, Context, options)
	}
}

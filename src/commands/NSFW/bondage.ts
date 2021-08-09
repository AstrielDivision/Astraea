import { AstraeaRedditCommand, AstraeaCommandOptions } from '../../lib/Structures/Command'
import { PieceContext } from '@sapphire/framework'
import { ApplyOptions } from '@sapphire/decorators'

@ApplyOptions<AstraeaCommandOptions>({
	name: 'bondage',
	description: 'Returns a Image from r/bondage',
	nsfw: true
})
export default class Bondage extends AstraeaRedditCommand {
	constructor (Context: PieceContext, options: AstraeaCommandOptions) {
		super({ subreddit: 'bondage', nsfw: true, colour: 'BLACK' }, Context, options)
	}
}

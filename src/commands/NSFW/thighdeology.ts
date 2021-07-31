import { AstraeaRedditCommand, AstraeaCommandOptions } from '../../lib/Structures/Command'
import { PieceContext } from '@sapphire/framework'
import { ApplyOptions } from '@sapphire/decorators'

@ApplyOptions<AstraeaCommandOptions>({
	name: 'thigh',
	aliases: ['thighs', 'thighdeology'],
	description: 'Returns a Image from r/thighdeology',
	cooldownLimit: 3,
	nsfw: true,
	cooldownDelay: 2000
})
export default class Thighdeology extends AstraeaRedditCommand {
	constructor (Context: PieceContext, options: AstraeaCommandOptions) {
		super({ subreddit: 'thighdeology', nsfw: true, colour: 'BLACK' }, Context, options)
	}
}

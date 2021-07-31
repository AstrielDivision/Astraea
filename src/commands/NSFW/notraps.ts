import { AstraeaRedditCommand, AstraeaCommandOptions } from '../../lib/Structures/Command'
import { PieceContext } from '@sapphire/framework'
import { ApplyOptions } from '@sapphire/decorators'

@ApplyOptions<AstraeaCommandOptions>({
	name: 'notraps',
	aliases: ['trap'],
	description: 'Returns a Image from r/NoTraps',
	cooldownLimit: 3,
	nsfw: true,
	cooldownDelay: 2000
})
export default class Femboy extends AstraeaRedditCommand {
	constructor (Context: PieceContext, options: AstraeaCommandOptions) {
		super({ subreddit: 'NoTraps', nsfw: true, colour: 'PINK' }, Context, options)
	}
}

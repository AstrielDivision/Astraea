import { AstraeaRedditCommand, AstraeaCommandOptions } from '../../lib/Structures/Command'
import { PieceContext } from '@sapphire/framework'
import { ApplyOptions } from '@sapphire/decorators'

@ApplyOptions<AstraeaCommandOptions>({
	name: 'facepalm',
	aliases: ['fp'],
	description: 'Returns a Image from r/facepalm',
	cooldownLimit: 3,
	cooldownDelay: 2000
})
export default class FacePalm extends AstraeaRedditCommand {
	constructor (Context: PieceContext, options: AstraeaCommandOptions) {
		super({ subreddit: 'facepalm', nsfw: false, colour: 'PINK' }, Context, options)
	}
}

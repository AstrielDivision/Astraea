import { AstraeaRedditCommand, AstraeaCommandOptions } from '../../lib/Structures/Command'
import { PieceContext } from '@sapphire/framework'
import { ApplyOptions } from '@sapphire/decorators'

@ApplyOptions<AstraeaCommandOptions>({
	name: 'oldschool',
	aliases: ['oldschoolocool'],
	description: 'Returns an image from r/oldschoolcool'
})
export default class OldSchool extends AstraeaRedditCommand {
	constructor (Context: PieceContext, options: AstraeaCommandOptions) {
		super({ subreddit: 'oldschoolcool', nsfw: false, colour: 'GREY' }, Context, options)
	}
}

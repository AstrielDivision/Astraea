import { AstraeaRedditCommand, AstraeaCommandOptions } from '../../lib/Structures/Command'
import { PieceContext } from '@sapphire/framework'
import { ApplyOptions } from '@sapphire/decorators'

@ApplyOptions<AstraeaCommandOptions>({
	name: 'nonpoliticaltwitter',
	aliases: ['twitter'],
	description: 'Returns a Image from r/NonPoliticalTwitter',
	nsfw: false
})
export default class NonPoliticalTwitter extends AstraeaRedditCommand {
	constructor (Context: PieceContext, options: AstraeaCommandOptions) {
		super({ subreddit: 'NonPoliticalTwitter', nsfw: false, colour: 'BLUE' }, Context, options)
	}
}

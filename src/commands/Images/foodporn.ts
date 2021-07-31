import { AstraeaRedditCommand, AstraeaCommandOptions } from '../../lib/Structures/Command'
import { PieceContext } from '@sapphire/framework'
import { ApplyOptions } from '@sapphire/decorators'

@ApplyOptions<AstraeaCommandOptions>({
	name: 'foodporn',
	aliases: ['food'],
	description: 'Returns a Image from r/foodporn',
	cooldownLimit: 3,
	cooldownDelay: 2000
})
export default class FoodPorn extends AstraeaRedditCommand {
	constructor (Context: PieceContext, options: AstraeaCommandOptions) {
		super({ subreddit: 'foodporn', nsfw: false, colour: 'ORANGE' }, Context, options)
	}
}

import { AstraeaRedditCommand, AstraeaCommandOptions } from '../../lib/Structures/Command'
import { ApplyOptions } from '@sapphire/decorators'

@ApplyOptions<AstraeaCommandOptions>({
	name: 'blessed',
	description: 'Returns an image from r/blessedimages'
})
export default class Blessed extends AstraeaRedditCommand {
	constructor (...args: unknown[]) {
		// @ts-ignore
		super({ subreddit: 'blessed', nsfw: false }, ...args)
	}
}

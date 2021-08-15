import { ApplyOptions } from '@sapphire/decorators'
import { PieceContext } from '@sapphire/framework'
import { AstraeaCommandOptions } from '#lib/Structures/BaseCommand'
import { AstraeaRedditCommand } from '#lib/Structures/commands/RedditCommand'

@ApplyOptions<AstraeaCommandOptions>({
  name: 'blessed',
  description: 'Returns an image from r/blessedimages',
  cooldownLimit: 3,
  cooldownDelay: 2000
})
export default class Memes extends AstraeaRedditCommand {
  constructor(Context: PieceContext, options: AstraeaCommandOptions) {
    super({ subreddit: 'blessedimages', nsfw: false, colour: 'WHITE' }, Context, options)
  }
}

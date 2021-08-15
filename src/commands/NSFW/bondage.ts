import { ApplyOptions } from '@sapphire/decorators'
import { PieceContext } from '@sapphire/framework'
import { AstraeaCommandOptions } from '#lib/Structures/BaseCommand'
import { AstraeaRedditCommand } from '#lib/Structures/commands/RedditCommand'

@ApplyOptions<AstraeaCommandOptions>({
  name: 'bondage',
  description: 'Returns a Image from r/bondage',
  nsfw: true
})
export default class Bondage extends AstraeaRedditCommand {
  constructor(Context: PieceContext, options: AstraeaCommandOptions) {
    super({ subreddit: 'bondage', nsfw: true, colour: 'DARK_BUT_NOT_BLACK' }, Context, options)
  }
}

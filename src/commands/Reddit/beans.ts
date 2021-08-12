import { ApplyOptions } from '@sapphire/decorators'
import { PieceContext } from '@sapphire/framework'
import { AstraeaCommandOptions } from '../../lib/Structures/Command'
import { AstraeaRedditCommand } from '../../lib/Structures/commands/RedditCommand'

@ApplyOptions<AstraeaCommandOptions>({
  name: 'beans',
  description: 'Returns a Image from r/BeansInStrangePlaces',
  nsfw: false
})
export default class BeansInStrangePlaces extends AstraeaRedditCommand {
  constructor(Context: PieceContext, options: AstraeaCommandOptions) {
    super({ subreddit: 'BeansInStrangePlaces', nsfw: false, colour: 'BROWN' }, Context, options)
  }
}

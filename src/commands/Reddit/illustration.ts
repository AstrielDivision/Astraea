import { ApplyOptions } from '@sapphire/decorators'
import { PieceContext } from '@sapphire/framework'
import { AstraeaCommandOptions } from '../../lib/Structures/Command'
import { AstraeaRedditCommand } from '../../lib/Structures/commands/RedditCommand'

@ApplyOptions<AstraeaCommandOptions>({
  name: 'illustration',
  aliases: ['sketches', 'drawings'],
  description: 'Returns a Image from r/illustration',
  cooldownLimit: 3,
  cooldownDelay: 2000
})
export default class Illustration extends AstraeaRedditCommand {
  constructor(Context: PieceContext, options: AstraeaCommandOptions) {
    super({ subreddit: 'illustration', nsfw: false, colour: 'WHITE' }, Context, options)
  }
}

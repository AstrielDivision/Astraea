import { ApplyOptions } from '@sapphire/decorators'
import { PieceContext } from '@sapphire/framework'
import { AstraeaCommandOptions } from '#lib/Structures/BaseCommand'
import { AstraeaRedditCommand } from '#lib/Structures/commands/RedditCommand'

@ApplyOptions<AstraeaCommandOptions>({
  name: 'notraps',
  aliases: ['trap'],
  description: 'Returns a Image from r/NoTraps',
  cooldownLimit: 3,
  nsfw: true,
  cooldownDelay: 2000
})
export default class Femboy extends AstraeaRedditCommand {
  constructor(Context: PieceContext, options: AstraeaCommandOptions) {
    super({ subreddit: 'NoTraps', nsfw: true, colour: 'DARK_VIVID_PINK' }, Context, options)
  }
}

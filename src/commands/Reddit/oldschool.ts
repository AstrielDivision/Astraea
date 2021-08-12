import { ApplyOptions } from '@sapphire/decorators'
import { PieceContext } from '@sapphire/framework'
import { AstraeaCommandOptions } from '../../lib/Structures/Command'
import { AstraeaRedditCommand } from '../../lib/Structures/commands/RedditCommand'

@ApplyOptions<AstraeaCommandOptions>({
  name: 'oldschool',
  aliases: ['oldschoolocool'],
  description: 'Returns an image from r/oldschoolcool'
})
export default class OldSchool extends AstraeaRedditCommand {
  constructor(Context: PieceContext, options: AstraeaCommandOptions) {
    super({ subreddit: 'oldschoolcool', nsfw: false, colour: 'GREY' }, Context, options)
  }
}

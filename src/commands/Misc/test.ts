import { AstraeaCommand, AstraeaCommandOptions } from '#lib/Structures/BaseCommand'
import type { Message } from 'discord.js'
import { ApplyOptions } from '@sapphire/decorators'
import type { Args } from '@sapphire/framework'

@ApplyOptions<AstraeaCommandOptions>({
  description: 'Solve this',
  usage: '[optional] <required>'
})
export default class Test extends AstraeaCommand {
  public async run(message: Message, args: Args): Promise<Message> {
    const arg = await args.pick('string')

    return await message.channel.send(arg)
  }
}

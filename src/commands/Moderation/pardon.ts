// TODO
import { AstraeaCommand, AstraeaCommandOptions } from '#lib/Structures/BaseCommand'
import type { Message } from 'discord.js'
import { ApplyOptions } from '@sapphire/decorators'
import type { Args } from '@sapphire/framework'

@ApplyOptions<AstraeaCommandOptions>({
  name: 'example',
  description: 'Solve this',
  usage: '[optional] <required>'
})
export default class example extends AstraeaCommand {
  public async run(message: Message, args: Args): Promise<Message> {
    return await message.channel.send('Not fully ready')
  }
}

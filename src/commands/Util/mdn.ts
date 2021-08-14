import { AstraeaCommand, AstraeaCommandOptions } from '../../lib/Structures/Command'
import { Message, MessageEmbed } from 'discord.js'
import { ApplyOptions } from '@sapphire/decorators'
import { Args } from '@sapphire/framework'
import { FetchResultTypes } from '@sapphire/fetch'

@ApplyOptions<AstraeaCommandOptions>({
  name: 'mdn',
  description: 'Find something on the MDN Docs',
  usage: '<query>'
})
export default class MDN extends AstraeaCommand {
  public async run(message: Message, args: Args): Promise<Message> {
    const query = (await args.pickResult('string')).value

    if (!query) return await message.channel.send('I cannot search for nothing in the MDN Docs!')

    const res = await this.container.client.util.fetch(
      `https://mdn.gideonbot.com/embed?q=${query}`,
      FetchResultTypes.JSON
    )

    const embed = new MessageEmbed(res)

    return await message.channel.send({ embeds: [embed] })
  }
}

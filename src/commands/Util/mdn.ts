import { AstraeaCommand, AstraeaCommandOptions } from '#lib/Structures/BaseCommand'
import { ColorResolvable, Message, MessageEmbed } from 'discord.js'
import { ApplyOptions } from '@sapphire/decorators'
import type { Args } from '@sapphire/framework'
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

    const embed = new MessageEmbed(
      await this.container.client.util.fetch<MDNResponse>(
        `https://mdn.gideonbot.com/embed?q=${query}`,
        FetchResultTypes.JSON
      )
    )

    return await message.channel.send({ embeds: [embed] })
  }
}

interface MDNResponse {
  color: ColorResolvable
  title: string
  url: string
  author: {
    name: string
  }
  icon_url: {
    url: string
  }
  description: string
}

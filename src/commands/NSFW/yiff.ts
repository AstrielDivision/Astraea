import { AstraeaCommand, AstraeaCommandOptions } from '#lib/Structures/BaseCommand'
import { ApplyOptions } from '@sapphire/decorators'
import { Message, MessageEmbed } from 'discord.js'
import Yiff from '../../lib/yiff.ts/Yiff'

@ApplyOptions<AstraeaCommandOptions>({
  name: 'yiff',
  aliases: ['yiff', 'floofydev'],
  description: 'Returns an Image from api.floofy.dev',
  cooldownLimit: 6,
  nsfw: true,
  cooldownDelay: 5000
})
export default class YiffFloofyDev extends AstraeaCommand {
  public async run(message: Message): Promise<Message> {
    const req: Request = await Yiff.floofy()

    const embed = new MessageEmbed().setImage(req.url).setColor('RANDOM')

    return await message.channel.send({
      embeds: [embed]
    })
  }
}

interface Request {
  url: string
}

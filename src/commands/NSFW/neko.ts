import { AstraeaCommand, AstraeaCommandOptions } from '#lib/Structures/BaseCommand'
import { ApplyOptions } from '@sapphire/decorators'
import { Message, MessageEmbed } from 'discord.js'
import type { Image } from '@aero/ksoft'

@ApplyOptions<AstraeaCommandOptions>({
  name: 'neko',
  description: 'Returns a random image of a neko (These images have been moderated)',
  cooldownLimit: 3,
  nsfw: true,
  cooldownDelay: 2000
})
export default class Neko extends AstraeaCommand {
  public async run(message: Message): Promise<Message> {
    const { url }: Image = await this.container.client.ksoft.images.random('neko', {
      nsfw: true
    })
    const embed = new MessageEmbed()
      .setFooter('Powered by api.ksoft.si')
      .setURL(url)
      .setColor('DARK_VIVID_PINK')
      .setTimestamp()
      .setImage(url)
    return await message.channel.send({
      embeds: [embed]
    })
  }
}

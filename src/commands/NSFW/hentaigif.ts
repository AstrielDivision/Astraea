import { AstraeaCommand, AstraeaCommandOptions } from '../../lib/Structures/Command'
import { ApplyOptions } from '@sapphire/decorators'
import { Message, MessageEmbed } from 'discord.js'
import { Image } from '@aero/ksoft'

@ApplyOptions<AstraeaCommandOptions>({
  name: 'hentaigif',
  description: 'Returns an animated image of hentai',
  cooldownLimit: 3,
  nsfw: true,
  cooldownDelay: 2000
})
export default class HentaiGif extends AstraeaCommand {
  public async run(message: Message): Promise<Message> {
    const { url }: Image = await this.container.client.ksoft.images.random('hentai_gif', {
      nsfw: true
    })
    const embed = new MessageEmbed()
      .setFooter('Powered by api.ksoft.si')
      .setURL(url)
      .setColor('PINK')
      .setTimestamp()
      .setImage(url)
    return await message.channel.send(embed)
  }
}

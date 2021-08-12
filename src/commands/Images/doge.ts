import { AstraeaCommand, AstraeaCommandOptions } from '../../lib/Structures/Command'
import { ApplyOptions } from '@sapphire/decorators'
import { Message, MessageEmbed } from 'discord.js'
import { Image } from '@aero/ksoft'

@ApplyOptions<AstraeaCommandOptions>({
  name: 'doge',
  aliases: ['doge', 'wow'],
  description: 'Returns an image of doge. Wow',
  cooldownLimit: 3,
  cooldownDelay: 2000
})
export default class DogeWow extends AstraeaCommand {
  public async run(message: Message): Promise<Message> {
    const { url }: Image = await this.container.client.ksoft.images.random('doge', {
      nsfw: false
    })
    const embed = new MessageEmbed()
      .setTitle('Wow')
      .setFooter('Powered by api.ksoft.si')
      .setURL(url)
      .setColor('BROWN')
      .setTimestamp()
      .setImage(url)
    return await message.channel.send(embed)
  }
}

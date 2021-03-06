import { AstraeaCommand, AstraeaCommandOptions } from '#lib/Structures/BaseCommand'
import { ApplyOptions } from '@sapphire/decorators'
import { Message, MessageEmbed } from 'discord.js'
import type { Image } from '@aero/ksoft'

@ApplyOptions<AstraeaCommandOptions>({
  name: 'dog',
  aliases: ['dog'],
  description: 'Returns an image of a dog',
  cooldownLimit: 3,
  cooldownDelay: 2000
})
export default class Dog extends AstraeaCommand {
  public async run(message: Message): Promise<Message> {
    const { url }: Image = await this.container.client.ksoft.images.random('dog', {
      nsfw: false
    })
    const embed = new MessageEmbed()
      .setTitle('Catt')
      .setFooter('Powered by api.ksoft.si')
      .setURL(url)
      .setColor('DARK_GREY')
      .setTimestamp()
      .setImage(url)
    return await message.channel.send({ embeds: [embed] })
  }
}

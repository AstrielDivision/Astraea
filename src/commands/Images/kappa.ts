import { AstraeaCommand, AstraeaCommandOptions } from '#lib/Structures/BaseCommand'
import { ApplyOptions } from '@sapphire/decorators'
import { Message, MessageEmbed } from 'discord.js'
import type { Image } from '@aero/ksoft'

@ApplyOptions<AstraeaCommandOptions>({
  name: 'kappa',
  description: 'Returns an image of kappa',
  cooldownLimit: 3,
  cooldownDelay: 2000
})
export default class Fox extends AstraeaCommand {
  public async run(message: Message): Promise<Message> {
    const { url }: Image = await this.container.client.ksoft.images.random('kappa', {
      nsfw: false
    })
    const embed = new MessageEmbed()
      .setTitle('Kappa lul')
      .setFooter('Powered by api.ksoft.si')
      .setURL(url)
      .setColor('NOT_QUITE_BLACK')
      .setTimestamp()
      .setImage(url)
    return await message.channel.send({ embeds: [embed] })
  }
}

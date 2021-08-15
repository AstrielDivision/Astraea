import { AstraeaCommand, AstraeaCommandOptions } from '#lib/Structures/BaseCommand'
import { Message, MessageEmbed } from 'discord.js'
import { ApplyOptions, RequiresUserPermissions } from '@sapphire/decorators'
import { Args } from '@sapphire/framework'

@ApplyOptions<AstraeaCommandOptions>({
  name: 'poll',
  description: 'Create a Poll',
  usage: '<description>'
})
export default class Poll extends AstraeaCommand {
  @RequiresUserPermissions('MANAGE_MESSAGES')
  public async run(message: Message, args: Args): Promise<unknown> {
    const description = (await args.pickResult('string')).value

    if (!description) return await message.channel.send('No description provided')

    const embed = new MessageEmbed()
      .setTitle('Poll!')
      .setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }))
      .setDescription(description)

    return await message.channel.send({ embeds: [embed] }).then(m => {
      void m.react('👍')
      void m.react('👎')
    })
  }
}

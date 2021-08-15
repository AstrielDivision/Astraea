import { AstraeaCommand, AstraeaCommandOptions } from '#lib/Structures/BaseCommand'
import { Message, MessageEmbed } from 'discord.js'
import { ApplyOptions } from '@sapphire/decorators'
import dayjs from 'dayjs'

@ApplyOptions<AstraeaCommandOptions>({
  name: 'serverinfo',
  aliases: ['si'],
  description: 'Fetch the current guild\'s info'
})
export default class example extends AstraeaCommand {
  public async run(message: Message): Promise<Message> {
    const guild = message.guild
    const roles: string[] = []

    guild.roles.cache.forEach(r => {
      if (r.name === '@everyone') return

      return roles.push(r.name)
    })

    const embed = new MessageEmbed()
      .setTitle(`${guild.name} | Guild Info`)
      .setColor('BLURPLE')
      .addFields(
        { name: 'Guild ID', value: guild.id, inline: true },
        { name: 'Owner ID', value: (await guild.fetchOwner()).id, inline: true },
        { name: 'Owner', value: (await guild.fetchOwner()).displayName, inline: true },
        { name: 'Channels', value: guild.channels.cache.size.toString(), inline: true },
        { name: 'Member Count', value: guild.memberCount.toString(), inline: true },
        { name: 'Created At', value: dayjs(guild.createdTimestamp).format('MM/DD/YYYY'), inline: true },
        {
          name: `Roles (${guild.roles.cache.size})`,
          value: roles.length > 10 ? roles.join(', ') : roles.join(', ').slice(0, 10),
          inline: true
        }
      )
      .setThumbnail(guild.iconURL({ dynamic: true }))

    return await message.channel.send({ embeds: [embed] })
  }
}

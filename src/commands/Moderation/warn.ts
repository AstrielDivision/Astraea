import { AstraeaCommand, AstraeaCommandOptions } from '#lib/Structures/BaseCommand'
import { Message, MessageEmbed, User } from 'discord.js'
import { ApplyOptions, RequiresUserPermissions } from '@sapphire/decorators'
import type { Args } from '@sapphire/framework'
import db from '#database'
import type { Case } from '#types'

@ApplyOptions<AstraeaCommandOptions>({
  name: 'warn',
  description: 'Warns a user',
  usage: '<@user | userID> [Case reason]'
})
export default class Warn extends AstraeaCommand {
  @RequiresUserPermissions('KICK_MEMBERS')
  public async run(message: Message, args: Args): Promise<Message> {
    const { user } = (await args.pickResult('member')).value
    const reason = (await args.restResult('string')).value

    if (!user) return await message.channel.send('You didn\'t provide a user!')
    if (user.id === message.author.id) return await message.channel.send('You can\'t warn yourself!')
    if (user.id === this.container.client.id) return await message.channel.send('Did I do something?')

    return await this.Warn(message, message.author, user, reason)
  }

  private async Warn(message: Message, moderator: User, user: User, case_reason?: string): Promise<Message> {
    const { data: response } = await db
      .from<Case>('warns')
      .insert({
        case_id: Date.now().toString(36).toUpperCase(),
        moderator_id: moderator.id,
        user_id: user.id,
        guild: message.guild.id,
        case_reason: case_reason
      })
      .single()

    const embed = new MessageEmbed()
      .setTitle(`Warn | Case ${response.case_id}`)
      .addField('Moderator', message.author.username)
      .addField('Reason', response.case_reason)
      .setColor('RED')

    return await message.channel.send({ embeds: [embed] })
  }
}

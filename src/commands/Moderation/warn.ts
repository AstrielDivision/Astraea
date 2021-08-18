import { AstraeaCommand, AstraeaCommandOptions } from '#lib/Structures/BaseCommand'
import { Message, MessageEmbed, User } from 'discord.js'
import { ApplyOptions, RequiresUserPermissions } from '@sapphire/decorators'
import type { Args } from '@sapphire/framework'
import CaseModel from '#lib/Models/WarnCase'

@ApplyOptions<AstraeaCommandOptions>({
  name: 'warn',
  description: 'Warns a user',
  usage: '<@user | userID> [Case reason]'
})
export default class Warn extends AstraeaCommand {
  @RequiresUserPermissions('BAN_MEMBERS' || 'KICK_MEMBERS')
  public async run(message: Message, args: Args): Promise<Message> {
    const { user } = (await args.pickResult('member')).value
    const reason = (await args.restResult('string')).value

    if (!user) return await message.channel.send('You didn\'t provide a user!')
    if (user.id === message.author.id) return await message.channel.send('You can\'t warn yourself!')

    return await this.Warn(message, message.author, user, reason)
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  private async Warn(message: Message, moderator: User, user: User, case_reason?: string): Promise<Message> {
    const Warn = await new CaseModel({
      moderator: moderator.tag,
      user: user.tag,
      user_id: user.id,
      guild: message.guild.id,
      case_reason: case_reason
    }).save()

    const embed = new MessageEmbed()
      .setTitle(`Warn | Case ${Warn.case_id}`)
      .addField('Reason', Warn.case_reason)
      .addField('Moderator', Warn.moderator)
      .setColor('RED')

    return await message.channel.send({ embeds: [embed] })
  }
}

import { AstraeaCommand, AstraeaCommandOptions } from '#lib/Structures/BaseCommand'
import { Message, User, MessageEmbed } from 'discord.js'
import { ApplyOptions } from '@sapphire/decorators'
import type { Args } from '@sapphire/framework'
import WarnCase, { Case } from '#lib/Models/WarnCase'

@ApplyOptions<AstraeaCommandOptions>({
  name: 'warns',
  description: 'Fetch a users or your warns',
  usage: '[@user | userID] [caseID]'
})
export default class Warns extends AstraeaCommand {
  public async run(message: Message, args: Args): Promise<Message> {
    const { user } = args.finished ? message.member : await args.pick('member')
    const caseID = await args.pick('string').catch(() => '')

    return await this.Warns(message, user, caseID)
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  private async Warns(message: Message, user: User, case_id?: string): Promise<Message> {
    if (case_id) {
      const c = await this.FetchWarn(user, message.guild.id, case_id)

      if (!c) return await message.channel.send('I didn\'t find a case with that ID')

      const embed = new MessageEmbed()
        .setTitle(`Case ${c.case_id}`)
        .addField('Warned User ID', c.user_id, true)
        .addField('Reason', c.case_reason, true)
        .addField('Moderator', c.moderator, true)
        .addField('Pardoned?', c.pardoned ? 'Yes' : 'No')

      return await message.channel.send({ embeds: [embed] })
    }

    const { warns, count } = await this.FetchWarns(user.id, message.guild.id)

    const embed = new MessageEmbed()
      .setTitle(`${user.id === message.author.id ? 'Your' : user.username + '\'s'} warns [${count}]`)
      .setDescription(`Cases:\n${warns.map(c => `\`${c.case_id}\``).join(', ')}`)

    return await message.channel.send({ embeds: [embed] })
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  private async FetchWarn(user: User, guildID: string, case_id: string): Promise<Case> {
    const Warns = await WarnCase.findOne({ user_id: user.id, guild: guildID, case_id })

    return Warns
  }

  private async FetchWarns(user: string, guildID: string): Promise<{ warns: Case[], count: number }> {
    const Warns = await WarnCase.find({ user_id: user, guild: guildID })
    const Count = await WarnCase.find({ user_id: user, guild: guildID }).countDocuments()

    return {
      warns: Warns,
      count: Count
    }
  }
}

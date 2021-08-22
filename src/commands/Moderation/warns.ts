import { AstraeaCommand, AstraeaCommandOptions } from '#lib/Structures/BaseCommand'
import { Message, User, MessageEmbed } from 'discord.js'
import { ApplyOptions } from '@sapphire/decorators'
import type { Args } from '@sapphire/framework'
import WarnCase from '#lib/Models/WarnCase'
import type { Case } from '#lib/Models/types'

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

      const moderator = await this.container.client.util.findUser(c.moderator_id)

      const embed = new MessageEmbed()
        .setTitle(`Case ${c.case_id}`)
        .addField('Moderator', moderator.username, true)
        .addField('Reason', c.case_reason, true)
        .addField('Pardoned?', c.pardoned ? 'Yes' : 'No')
        .setColor(c.pardoned ? 'GREEN' : 'RED')

      return await message.channel.send({ embeds: [embed] })
    }

    const { warns, count } = await this.FetchWarns(user.id, message.guild.id)

    const embed = new MessageEmbed()
      .setTitle(`${user.id === message.author.id ? 'Your' : user.username + '\'s'} warns [${count}]`)
      .setDescription(`Cases:\n${count ? warns.map(c => `\`${c.case_id}\``).join(', ') : 'This user has no cases.'}`)

    return await message.channel.send({ embeds: [embed] })
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  private async FetchWarn(user: User, guildID: string, case_id: string): Promise<Case> {
    const Warns = await WarnCase.findOne({ user_id: user.id, guild: guildID, case_id })

    return Warns
  }

  private async FetchWarns(user: string, guildID: string): Promise<{ warns: Case[], count: number }> {
    const Warns = await WarnCase.find({ user_id: user, guild: guildID })

    return {
      warns: Warns,
      count: Warns.length
    }
  }
}

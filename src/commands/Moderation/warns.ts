import { AstraeaCommand, AstraeaCommandOptions } from '#lib/Structures/BaseCommand'
import { Message, User, MessageEmbed } from 'discord.js'
import { ApplyOptions } from '@sapphire/decorators'
import type { Args } from '@sapphire/framework'
import db from '#database'
import type { Case } from '#types'

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

    const { warns } = await this.FetchWarns(user.id, message.guild.id)

    const embed = new MessageEmbed()
      .setTitle(`${user.id === message.author.id ? 'Your' : user.username + '\'s'} warns [${warns.length}]`)
      .setDescription(
        `Cases:\n${warns.length ? warns.map(c => `\`${c.case_id}\``).join(', ') : 'This user has no cases.'}`
      )

    return await message.channel.send({ embeds: [embed] })
  }

  private async FetchWarn(user: User, guildID: string, case_id: string): Promise<Case> {
    const { data: warn } = await db
      .from<Case>('warns')
      .select()
      .eq('user_id', user.id)
      .eq('guild', guildID)
      .eq('case_id', case_id)
      .single()

    return warn
  }

  private async FetchWarns(user: string, guildID: string): Promise<{ warns: Case[] }> {
    const { data: warnings } = await db.from<Case>('warns').select().eq('user_id', user).eq('guild', guildID)

    return {
      warns: warnings
    }
  }
}

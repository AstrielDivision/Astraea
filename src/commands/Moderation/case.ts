import { AstraeaCommand, AstraeaCommandOptions } from '#lib/Structures/BaseCommand'
import { Message, MessageEmbed } from 'discord.js'
import { ApplyOptions, RequiresUserPermissions } from '@sapphire/decorators'
import type { Args } from '@sapphire/framework'
import db from '#database'
import type { Case as CaseType } from '#types'

@ApplyOptions<AstraeaCommandOptions>({
  description: 'Set a case reason for a warning',
  usage: '<caseID> <reason>'
})
export default class Case extends AstraeaCommand {
  @RequiresUserPermissions('KICK_MEMBERS')
  public async run(message: Message, args: Args): Promise<Message> {
    const caseID = (await args.pickResult('string')).value
    const reason = (await args.restResult('string')).value

    if (!caseID) return await message.channel.send('No case ID provided')
    if (!reason) return await message.channel.send('No reason provided')

    const { data: before } = await db
      .from<CaseType>('warns')
      .select()
      .eq('guild', message.guild.id)
      .eq('case_id', caseID)
      .single()

    try {
      await db.from<CaseType>('warns').update({ case_reason: reason }).eq('guild', message.guild.id)
    } catch {
      return await message.channel.send(
        'Something went wrong...\nIt was most likely because we didn\'t find a case with that ID'
      )
    }

    const embed = new MessageEmbed()
      .setTitle(`Updated case ${caseID}`)
      .addField('Old', before.case_reason)
      .addField('New', reason)
      .setColor('ORANGE')

    return await message.channel.send({ embeds: [embed] })
  }
}

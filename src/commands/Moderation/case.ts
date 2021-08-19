import { AstraeaCommand, AstraeaCommandOptions } from '#lib/Structures/BaseCommand'
import { Message, MessageEmbed } from 'discord.js'
import { ApplyOptions, RequiresUserPermissions } from '@sapphire/decorators'
import type { Args } from '@sapphire/framework'
import CaseModel from '#lib/Models/WarnCase'

@ApplyOptions<AstraeaCommandOptions>({
  description: 'Set a case reason for a warning',
  usage: '<caseID> <reason>'
})
export default class Case extends AstraeaCommand {
  @RequiresUserPermissions('KICK_MEMBERS')
  public async run(message: Message, args: Args): Promise<Message> {
    const caseID = (await args.pickResult('string')).value
    const reason = (await args.restResult('string')).value

    const guild = message.guild

    if (!caseID) return await message.channel.send('No case ID provided')
    if (!reason) return await message.channel.send('No reason provided')

    const before = await CaseModel.findOne({ case_id: caseID, guild: guild.id })

    await CaseModel.findOneAndUpdate({ case_id: caseID, guild: guild.id }, { case_reason: reason }).catch(
      () => void message.channel.send(`I couldn't find a case with the ID ${caseID}`)
    )

    const embed = new MessageEmbed()
      .setTitle(`Updated case ${caseID}`)
      .addField('Old', before.case_reason)
      .addField('New', reason)
      .setColor('ORANGE')

    return await message.channel.send({ embeds: [embed] })
  }
}

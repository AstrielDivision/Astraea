import { AstraeaCommand, AstraeaCommandOptions } from '#lib/Structures/BaseCommand'
import type { Guild, Message, User } from 'discord.js'
import { ApplyOptions, RequiresUserPermissions } from '@sapphire/decorators'
import type { Args } from '@sapphire/framework'
import CaseModel from '#lib/Models/WarnCase'

@ApplyOptions<AstraeaCommandOptions>({
  description: 'Pardon a warn case of a user',
  usage: '<@user | userID> <caseID>',
  flags: ['remove', 'r']
})
export default class Pardon extends AstraeaCommand {
  @RequiresUserPermissions('KICK_MEMBERS')
  public async run(message: Message, args: Args): Promise<Message> {
    const { user } = (await args.pickResult('member')).value
    const caseID = (await args.pickResult('string')).value
    const removeFlag = args.getFlags('remove', 'r')

    if (!user) return await message.channel.send('No user provided!')
    if (!caseID) return await message.channel.send('No case ID provided!')

    if (await this.isPardoned(user, message.guild, caseID)) return await this.unPardon(message, user, caseID)

    return await this.pardon(message, user, caseID, removeFlag)
  }

  private async pardon(message: Message, user: User, caseID: string, remove: boolean): Promise<Message> {
    if (remove) {
      const removed = await CaseModel.findOneAndRemove({ user_id: user.id, guild: message.guild.id, case_id: caseID })

      if (removed === null) return await message.channel.send('Could not find a case with that ID')

      return await message.channel.send(`${user.toString()}'s case has been pardoned and removed (irreversible)`)
    }
    const updated = await CaseModel.findOneAndUpdate(
      { user_id: user.id, guild: message.guild.id, case_id: caseID },
      { pardoned: true }
    )

    if (updated === null) return await message.channel.send('Could not find a case with that ID')

    return await message.channel.send(`${user.toString()}'s case has been pardoned`)
  }

  private async unPardon(message: Message, user: User, caseID: string): Promise<Message> {
    await CaseModel.findOneAndUpdate(
      { user_id: user.id, guild: message.guild.id, case_id: caseID },
      { pardoned: false }
    ).catch(() => void message.channel.send(`A case with the ID ${caseID} doesn't exist.`))

    return await message.channel.send(`${user.toString()}'s case is no longer pardoned`)
  }

  private async isPardoned(user: User, guild: Guild, caseID: string): Promise<boolean> {
    const { pardoned } = await CaseModel.findOne({ user_id: user.id, guild: guild.id, case_id: caseID })

    return pardoned
  }
}

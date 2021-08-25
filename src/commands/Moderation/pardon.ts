import { AstraeaCommand, AstraeaCommandOptions } from '#lib/Structures/BaseCommand'
import type { Guild, Message, User } from 'discord.js'
import { ApplyOptions, RequiresUserPermissions } from '@sapphire/decorators'
import type { Args } from '@sapphire/framework'
import db from '#database'
import type { Case as CaseType } from '#types'

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
      try {
        await db
          .from<CaseType>('warns')
          .delete()
          .eq('guild', message.guild.id)
          .eq('case_id', caseID)
          .eq('user_id', user.id)

        return await message.channel.send(`${user.toString()}'s case has been pardoned and removed (irreversible)`)
      } catch {
        return await message.channel.send(
          'Something went wrong...\nIt was most likely because we didn\'t find a case with that ID'
        )
      }
    }
    try {
      await db
        .from<CaseType>('warns')
        .update({ pardoned: true })
        .eq('guild', message.guild.id)
        .eq('case_id', caseID)
        .eq('user_id', user.id)
        .single()
    } catch (err) {
      this.container.client.emit('error', err.stack)
      return await message.channel.send(
        'Something went wrong...\nIt was most likely because we didn\'t find a case with that ID'
      )
    }

    return await message.channel.send(`${user.toString()}'s case has been pardoned`)
  }

  private async unPardon(message: Message, user: User, caseID: string): Promise<Message> {
    await db
      .from<CaseType>('warns')
      .update({ pardoned: false })
      .eq('guild', message.guild.id)
      .eq('case_id', caseID)
      .eq('user_id', user.id)
      .limit(1)

    return await message.channel.send(`${user.toString()}'s case is no longer pardoned`)
  }

  private async isPardoned(user: User, guild: Guild, caseID: string): Promise<boolean> {
    const { data: foundCase } = await db
      .from<CaseType>('warns')
      .select()
      .eq('guild', guild.id)
      .eq('case_id', caseID)
      .eq('user_id', user.id)
      .single()

    return foundCase.pardoned
  }
}

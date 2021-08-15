import { AstraeaCommand, AstraeaCommandOptions } from '#lib/Structures/BaseCommand'
import { Message } from 'discord.js'
import { ApplyOptions, RequiresUserPermissions } from '@sapphire/decorators'
import { Args } from '@sapphire/framework'

@ApplyOptions<AstraeaCommandOptions>({
  name: 'kick',
  description: 'Kick a user with or without reason',
  requiredClientPermissions: ['KICK_MEMBERS'],
  preconditions: ['GuildTextOnly'],
  usage: '<@user | userID> [reason]'
})
export default class Kick extends AstraeaCommand {
  @RequiresUserPermissions('BAN_MEMBERS')
  public async run(message: Message, args: Args): Promise<Message> {
    const member = (await args.pickResult('member')).value
    const reason = (await args.restResult('string')).value
    if (!member) return await message.channel.send('You didn\'t mention a user to kick!')

    if (!member.kickable) return await message.channel.send('You\'re not allowed to kick this user!')

    await member.kick(reason || 'Not Specified')

    return await message.channel.send(`**Successfully kicked** \`${member.user.tag}\``)
  }
}

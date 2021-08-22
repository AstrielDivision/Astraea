import { AstraeaCommand, AstraeaCommandOptions } from '#lib/Structures/BaseCommand'
import type { Message } from 'discord.js'
import { ApplyOptions, RequiresUserPermissions } from '@sapphire/decorators'
import type { Args } from '@sapphire/framework'
import GuildSettingsModel from '#lib/Models/GuildSettings'

@ApplyOptions<AstraeaCommandOptions>({
  description: 'Set the discord bot\'s prefix',
  usage: '[set | show | reset] [new prefix]',
  subCommands: ['reset', 'set', { input: 'show', default: true }]
})
export default class Prefix extends AstraeaCommand {
  @RequiresUserPermissions('MANAGE_GUILD')
  public async set(message: Message, args: Args): Promise<Message> {
    const prefix = await args.pick('string')

    if (!prefix) return await message.channel.send('No new prefix provided')
    if (prefix.length >= 3) return await message.channel.send('The prefix must be less than 3 characters long')

    await GuildSettingsModel.findOneAndUpdate({ guild_id: message.guild.id }, { settings: { prefix } }).catch(
      async () => await message.channel.send('Something went wrong...')
    )

    return await message.channel.send('Successfully set the prefix set to ' + prefix)
  }

  @RequiresUserPermissions('MANAGE_GUILD')
  public async reset(message: Message): Promise<Message> {
    await GuildSettingsModel.findOneAndUpdate({ guild_id: message.guild.id }, { settings: { prefix: null } }).catch(
      async () => await message.channel.send('Something went wrong...')
    )

    return await message.channel.send('Successfully reset the prefix')
  }

  public async show(message: Message): Promise<Message> {
    const {
      settings: { prefix }
    } = await GuildSettingsModel.findOne({ guild_id: message.guild.id })

    return await message.channel.send(`The current guild prefix is: ${prefix}`)
  }
}

import { AstraeaCommand, AstraeaCommandOptions } from '#lib/Structures/BaseCommand'
import type { Message } from 'discord.js'
import { ApplyOptions, RequiresUserPermissions } from '@sapphire/decorators'
import type { Args } from '@sapphire/framework'
import db from '#database'
import type { GuildSettings } from '#types'
import cfg from '../../config'

@ApplyOptions<AstraeaCommandOptions>({
  description: 'Set the discord bot\'s prefix',
  usage: '[set | reset | show: default] [new prefix]',
  subCommands: ['reset', 'set', { input: 'show', default: true }]
})
export default class Prefix extends AstraeaCommand {
  @RequiresUserPermissions('MANAGE_GUILD')
  public async set(message: Message, args: Args): Promise<Message> {
    const prefix = await args.pick('string')

    if (!prefix) return await message.channel.send('No new prefix provided')
    if (prefix.length >= 3) return await message.channel.send('The prefix must be less than 3 characters long')

    await db.from<GuildSettings>('guilds').update({ prefix: prefix }).eq('guild_id', message.guild.id)

    return await message.channel.send('Successfully set the prefix set to ' + prefix)
  }

  @RequiresUserPermissions('MANAGE_GUILD')
  public async reset(message: Message): Promise<Message> {
    await db.from<GuildSettings>('guilds').update({ prefix: null }).eq('guild_id', message.guild.id)

    return await message.channel.send('Successfully reset the prefix')
  }

  public async show(message: Message): Promise<Message> {
    const { data: settings } = await db.from<GuildSettings>('guilds').select().eq('guild_id', message.guild.id).single()

    return await message.channel.send(`The current guild prefix is: ${settings.prefix ?? cfg.prefix}`)
  }
}

import { AstraeaCommand, AstraeaCommandOptions } from '#lib/Structures/BaseCommand'
import { Message, MessageEmbed } from 'discord.js'
import { ApplyOptions, RequiresUserPermissions } from '@sapphire/decorators'
import type { Args } from '@sapphire/framework'
import db from '#database'
import type { GuildSettings } from '#types'
import cfg from '../../config'

@ApplyOptions<AstraeaCommandOptions>({
  description: 'Settings per guild',
  usage: '[list | enable | disable] [new value]',
  subCommands: ['enable', 'disable', { input: 'list', default: true }]
})
export default class Settings extends AstraeaCommand {
  public async list(message: Message): Promise<Message> {
    const { data: guild_data } = await db
      .from<GuildSettings>('guilds')
      .select()
      .eq('guild_id', message.guild.id)
      .single()

    const embed = new MessageEmbed()
      .setTitle(`Guild Settings | ${message.guild.name}`)
      .setDescription(
        `**Anti-Unmentionable:** ${guild_data['anti-unmentionable'] ? 'Enabled' : 'Disabled'}\n` +
          `**Anti-Invites:** ${guild_data['anti-invites'] ? 'Enabled' : 'Disabled'}`
      )
      .setFooter(`To disable these options use ${cfg.prefix}anti `)

    return await message.channel.send({ embeds: [embed] })
  }

  @RequiresUserPermissions('MANAGE_GUILD')
  public async enable(message: Message, args: Args): Promise<Message> {
    const setting = await args.pick('string')

    const embed = new MessageEmbed()

    switch (setting.toLowerCase()) {
      case 'unmentionable': {
        if (!message.guild.me.permissions.has('MANAGE_NICKNAMES')) {
          return await message.channel.send('I don\'t have the `MANAGE_NICKNAMES` permission!')
        }

        return await this.EnableAnti(message, 'unmentionable')
      }

      case 'invites': {
        if (!message.guild.me.permissions.has('MANAGE_MESSAGES')) {
          return await message.channel.send('I don\'t have the `MANAGE_MESSAGES` permission!')
        }

        return await this.EnableAnti(message, 'invites')
      }

      default: {
        embed.setDescription('You can enable: anti `unmentionable` names and anti discord `invites`')
      }
    }
  }

  @RequiresUserPermissions('MANAGE_GUILD')
  public async disable(message: Message, args: Args): Promise<Message> {
    const setting = await args.pick('string')

    const embed = new MessageEmbed()

    switch (setting.toLowerCase()) {
      case 'unmentionable': {
        return await this.DisableAnti(message, 'unmentionable')
      }

      case 'invites': {
        return await this.DisableAnti(message, 'invites')
      }

      default: {
        embed.setDescription('You can disable: anti `unmentionable` names and anti discord `invites`')
      }
    }
  }

  private async EnableAnti(message: Message, anti: string): Promise<Message> {
    switch (anti) {
      case 'unmentionable': {
        await db.from<GuildSettings>('guilds').update({ 'anti-unmentionable': true }).eq('guild_id', message.guild.id)

        return await message.channel.send('Now filtering unmentionable names')
      }
      case 'invites': {
        await db.from<GuildSettings>('guilds').update({ 'anti-invites': true }).eq('guild_id', message.guild.id)

        return await message.channel.send('Now filtering discord invites')
      }
    }
  }

  private async DisableAnti(message: Message, anti: string): Promise<Message> {
    switch (anti) {
      case 'unmentionable': {
        await db.from<GuildSettings>('guilds').update({ 'anti-unmentionable': false }).eq('guild_id', message.guild.id)

        return await message.channel.send('No longer filtering unmentionable names')
      }
      case 'invites': {
        await db.from<GuildSettings>('guilds').update({ 'anti-invites': false }).eq('guild_id', message.guild.id)

        return await message.channel.send('No longer filtering discord invites')
      }
    }
  }
}

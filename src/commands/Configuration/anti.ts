import { AstraeaCommand, AstraeaCommandOptions } from '#lib/Structures/BaseCommand'
import { Message, MessageEmbed } from 'discord.js'
import { ApplyOptions, RequiresUserPermissions } from '@sapphire/decorators'
import type { Args } from '@sapphire/framework'
import db from '#database'
import type { GuildSettings } from '#types'
import cfg from '../../config'

@ApplyOptions<AstraeaCommandOptions>({
  description: 'Settings per guild',
  usage: '<enable | disable | list: default> [new value]',
  subCommands: ['enable', 'disable', { input: 'list', default: true }]
})
export default class Settings extends AstraeaCommand {
  public async list(message: Message): Promise<Message> {
    const settings = await db.load<GuildSettings>(message.guild.id)

    const embed = new MessageEmbed()
      .setTitle(`Guild Settings | ${message.guild.name}`)
      .setDescription(
        `**Anti-Unmentionable:** ${settings.anti.unmentionable ? 'Enabled' : 'Disabled'}\n` +
          `**Anti-Invites:** ${settings.anti.invites ? 'Enabled' : 'Disabled'}` +
          `**Anti-Gifts:** ${settings.anti.gifts ? 'Enabled' : 'Disabled'}`
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

      case 'invite':
      case 'invites': {
        if (!message.guild.me.permissions.has('MANAGE_MESSAGES')) {
          return await message.channel.send('I don\'t have the `MANAGE_MESSAGES` permission!')
        }

        return await this.EnableAnti(message, 'invites')
      }

      case 'gift':
      case 'gifts': {
        if (!message.guild.me.permissions.has('MANAGE_MESSAGES')) {
          return await message.channel.send('I don\'t have the `MANAGE_MESSAGES` permission!')
        }

        return await this.EnableAnti(message, 'gifts')
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

      case 'invite':
      case 'invites': {
        return await this.DisableAnti(message, 'invites')
      }

      case 'gift':
      case 'gifts': {
        return await this.DisableAnti(message, 'gifts')
      }

      default: {
        embed.setDescription('You can disable: anti `unmentionable` names and anti discord `invites`')
      }
    }
  }

  private async EnableAnti(message: Message, anti: string): Promise<Message> {
    switch (anti) {
      case 'unmentionable': {
        const settings = await db.load<GuildSettings>(message.guild.id)

        settings.anti.unmentionable = true

        await db.saveChanges()

        return await message.channel.send('Now filtering unmentionable names')
      }
      case 'invite':
      case 'invites': {
        const settings = await db.load<GuildSettings>(message.guild.id)

        settings.anti.invites = true

        await db.saveChanges()

        return await message.channel.send('Now filtering discord invites')
      }

      case 'gift':
      case 'gifts': {
        const settings = await db.load<GuildSettings>(message.guild.id)

        settings.anti.gifts = true

        await db.saveChanges()

        return await message.channel.send('Now filtering discord gifts')
      }
    }
  }

  private async DisableAnti(message: Message, anti: string): Promise<Message> {
    switch (anti) {
      case 'unmentionable': {
        const settings = await db.load<GuildSettings>(message.guild.id)

        settings.anti.unmentionable = false

        await db.saveChanges()
        return await message.channel.send('No longer filtering unmentionable names')
      }
      case 'invite':
      case 'invites': {
        const settings = await db.load<GuildSettings>(message.guild.id)

        settings.anti.invites = false

        await db.saveChanges()
        return await message.channel.send('No longer filtering discord invites')
      }

      case 'gift':
      case 'gifts': {
        const settings = await db.load<GuildSettings>(message.guild.id)

        settings.anti.gifts = false

        await db.saveChanges()
        return await message.channel.send('Now filtering discord gifts')
      }
    }
  }
}

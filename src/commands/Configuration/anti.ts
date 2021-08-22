import { AstraeaCommand, AstraeaCommandOptions } from '#lib/Structures/BaseCommand'
import { Message, MessageEmbed, Snowflake } from 'discord.js'
import { ApplyOptions, RequiresUserPermissions } from '@sapphire/decorators'
import type { Args } from '@sapphire/framework'
import GuildSettingsModel from '#lib/Models/GuildSettings'
import type { Settings as GuildSettings } from '#lib/Models/types'
import cfg from '../../config'

@ApplyOptions<AstraeaCommandOptions>({
  description: 'Settings per guild',
  usage: '[list | enable | disable] [new value]',
  subCommands: ['enable', 'disable', { input: 'list', default: true }]
})
export default class Settings extends AstraeaCommand {
  public async list(message: Message): Promise<Message> {
    const anti = await this.GetAntiSettings(message.guild.id)

    const embed = new MessageEmbed()
      .setTitle(`Guild Settings | ${message.guild.name}`)
      .setDescription(`**Anti-Unmentionable:** ${anti.unmentionable ? 'Enabled' : 'Disabled'}`)
      .setFooter(`To disable these options use ${cfg.prefix}anti `)

    return await message.channel.send({ embeds: [embed] })
  }

  @RequiresUserPermissions('MANAGE_GUILD')
  public async enable(message: Message, args: Args): Promise<Message> {
    const setting = await args.pick('string')

    if (!setting) return await message.channel.send('A setting was not provided.')

    const embed = new MessageEmbed()

    switch (setting.toLowerCase()) {
      case 'unmentionable': {
        if (!message.guild.me.permissions.has('MANAGE_NICKNAMES')) {
          return await message.channel.send('I don\'t have the `MANAGE_NICKNAMES` permission!')
        }

        await this.EnableAnti(message.guild.id, setting).catch(
          async () => await message.channel.send('Something went wrong')
        )

        embed.setTitle('Enabled!')
        embed.setDescription('anti.unmentionable has been enabled')

        return await message.channel.send({ embeds: [embed] })
      }

      default: {
        return await message.channel.send('Available options: unmentionable')
      }
    }
  }

  @RequiresUserPermissions('MANAGE_GUILD')
  public async disable(message: Message, args: Args): Promise<Message> {
    const setting = await args.pick('string')

    if (!setting) return await message.channel.send('No setting was provided.\nAvailable: prefix')

    const embed = new MessageEmbed()

    switch (setting.toLowerCase()) {
      case 'unmentionable': {
        await this.DisableAnti(message.guild.id, setting).catch(
          async () => await message.channel.send('Something went wrong')
        )

        embed.setTitle('Success!')
        embed.setDescription('Successfully reset the prefix')

        return await message.channel.send({ embeds: [embed] })
      }

      default: {
        return await message.channel.send('Available options: prefix')
      }
    }
  }

  private async GetAntiSettings(guildID: Snowflake): Promise<GuildSettings['settings']['anti']> {
    if (!guildID) throw Error('No guild given')

    const {
      settings: { anti }
    } = await GuildSettingsModel.findOne({ guild_id: guildID })

    return anti
  }

  private async EnableAnti(guild: Snowflake, anti: string): Promise<GuildSettings['settings']> {
    if (!guild) throw Error('No guild given')
    if (!anti) throw Error('No setting given')

    switch (anti) {
      case 'unmentionable': {
        const { settings } = await GuildSettingsModel.findOneAndUpdate(
          { guild_id: guild },
          { settings: { anti: { unmentionable: true } } }
        )

        return settings
      }
    }
  }

  private async DisableAnti(guild: Snowflake, anti: string): Promise<GuildSettings['settings']> {
    if (!guild) throw Error('No guild given')
    if (!anti) throw Error('No setting given')

    switch (anti) {
      case 'unmentionable': {
        const { settings } = await GuildSettingsModel.findOneAndUpdate(
          { guild_id: guild },
          { settings: { anti: { unmentionable: false } } }
        )
        return settings
      }
    }
  }
}

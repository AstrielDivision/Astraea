import { AstraeaCommand, AstraeaCommandOptions } from '#lib/Structures/BaseCommand'
import { Message, MessageEmbed, Snowflake } from 'discord.js'
import { ApplyOptions, RequiresUserPermissions } from '@sapphire/decorators'
import type { Args } from '@sapphire/framework'
import GuildSettingsModel from '#lib/Models/GuildSettings'
import type { Settings as GuildSettings } from '#lib/Models/types'

@ApplyOptions<AstraeaCommandOptions>({
  description: 'Settings per guild',
  usage: '[list | reset | set] [new value]',
  subCommands: ['set', 'reset', { input: 'list', default: true }]
})
export default class Settings extends AstraeaCommand {
  public async list(message: Message): Promise<Message> {
    const settings = await this.GetSettings(message.guild.id)

    const embed = new MessageEmbed()
      .setTitle(`Guild Settings | ${message.guild.name}`)
      .setDescription(`**Prefix:** ${settings.prefix}`)
      .setFooter(`To reset a setting run ${settings.prefix}settings reset <setting>`)

    return await message.channel.send({ embeds: [embed] })
  }

  @RequiresUserPermissions('MANAGE_GUILD')
  public async set(message: Message, args: Args): Promise<Message> {
    const setting = await args.pick('string')
    const val = await args.pick('string')

    if (!setting) return await message.channel.send('A setting was not provided.')
    if (!val) return await message.channel.send('A value was not provided.')

    const embed = new MessageEmbed()

    switch (setting.toLowerCase()) {
      case 'prefix': {
        await this.SetSetting(message.guild.id, setting, val).catch(
          async () => await message.channel.send('Something went wrong')
        )

        embed.setTitle('Updated!')
        embed.setDescription(`Successfully updated the prefix to ${val}`)

        return await message.channel.send({ embeds: [embed] })
      }

      default: {
        return await message.channel.send('Available options: prefix')
      }
    }
  }

  @RequiresUserPermissions('MANAGE_GUILD')
  public async reset(message: Message, args: Args): Promise<Message> {
    const setting = await args.pick('string')

    if (!setting) return await message.channel.send('No setting was provided.\nAvailable: prefix')

    const embed = new MessageEmbed()

    switch (setting.toLowerCase()) {
      case 'prefix': {
        await this.ResetSetting(message.guild.id, setting).catch(
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

  private async GetSettings(guildID: Snowflake): Promise<GuildSettings['settings']> {
    if (!guildID) throw Error('No guild given')

    const { settings } = await GuildSettingsModel.findOne({ guild_id: guildID })

    return settings
  }

  private async SetSetting(guild: Snowflake, setting: string, newVal: string): Promise<GuildSettings['settings']> {
    if (!guild) throw Error('No guild given')
    if (!setting) throw Error('No setting given')
    if (!newVal) throw Error('No new value given')

    switch (setting) {
      case 'prefix': {
        const { settings } = await GuildSettingsModel.findOneAndUpdate(
          { guild_id: guild },
          { settings: { prefix: newVal } }
        )

        return settings
      }
    }
  }

  private async ResetSetting(guild: Snowflake, setting: string): Promise<GuildSettings['settings']> {
    if (!guild) throw Error('No guild given')
    if (!setting) throw Error('No setting given')

    switch (setting) {
      case 'prefix': {
        const { settings } = await GuildSettingsModel.findOneAndUpdate(
          { guild_id: guild },
          { settings: { prefix: null } }
        )

        return settings
      }
    }
  }
}

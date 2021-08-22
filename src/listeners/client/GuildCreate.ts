/* eslint-disable no-await-in-loop */
import { Events, Listener, ListenerOptions } from '@sapphire/framework'
import { ApplyOptions } from '@sapphire/decorators'
import type { Guild, TextChannel } from 'discord.js'
import GuildSettings from '#lib/Models/GuildSettings'

@ApplyOptions<ListenerOptions>({
  event: Events.GuildCreate
})
export default class GuildCreate extends Listener {
  public async run(guild: Guild): Promise<void> {
    await this.createMuteRoles(guild)
    await guild.members.fetch()
    return this.container.logger.info(`Joined ${guild.name} (${guild.id})`)
  }

  private async createMuteRoles(guild: Guild): Promise<void> {
    const { id } = await guild.roles.create({
      name: 'Muted | RTC Connecting',
      color: '#808080'
    })

    await GuildSettings.findOneAndUpdate({ guild_id: guild.id }, { mute: { role_id: id } })

    for (const channel of guild.channels.cache.filter(c => c.type === 'GUILD_TEXT').values()) {
      if (!guild.roles.cache.has(id)) {
        return null
      }
      await this.container.client.util.sleep(2000)
      await (channel as TextChannel).permissionOverwrites.create(id, {
        SEND_MESSAGES: false,
        ATTACH_FILES: false,
        ADD_REACTIONS: false
      })
    }
  }
}

import { Events, Listener, ListenerOptions } from '@sapphire/framework'
import { ApplyOptions } from '@sapphire/decorators'
import { Guild } from 'discord.js'

@ApplyOptions<ListenerOptions>({
  event: Events.GuildDelete
})
export default class GuildDelete extends Listener {
  public run(guild: Guild): void {
    return this.container.logger.info(`Left ${guild.name} (${guild.id})`)
  }
}

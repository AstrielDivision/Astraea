import { AstraeaCommand, AstraeaCommandOptions } from '#lib/Structures/BaseCommand'
import type { Message } from 'discord.js'
import { ApplyOptions } from '@sapphire/decorators'

@ApplyOptions<AstraeaCommandOptions>({
  name: 'ping',
  description: 'Returns bot ping'
})
export default class Ping extends AstraeaCommand {
  public async run(message: Message): Promise<Message> {
    const ping = await message.channel.send('Pong!')

    return await ping.edit(
      `Ping: ${this.container.client.ws.ping} ms\nHeartbeat: ${ping.createdTimestamp - message.createdTimestamp} ms`
    )
  }
}

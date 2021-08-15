import { AstraeaCommand, AstraeaCommandOptions } from '#lib/Structures/BaseCommand'
import { Message } from 'discord.js'
import { ApplyOptions } from '@sapphire/decorators'

@ApplyOptions<AstraeaCommandOptions>({
  name: 'reboot',
  description: 'Restart the bot',
  preconditions: ['OwnerOnly']
})
export default class Reboot extends AstraeaCommand {
  public async run(message: Message): Promise<Message> {
    await message.channel.send('Rebooting!')

    process.exit()
  }
}

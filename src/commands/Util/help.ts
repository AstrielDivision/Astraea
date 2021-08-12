/**
 * Original: https://github.com/gitcord-project/Gitcord/blob/main/src/commands/Info/help.ts
 * Licensed under the MIT License.
 */
import { ApplyOptions } from '@sapphire/decorators'
import { Args, Command } from '@sapphire/framework'
import { Message, MessageEmbed, TextChannel } from 'discord.js'
import cfg from '../../config'
import { AstraeaCommand, AstraeaCommandOptions } from '../../lib/Structures/Command'

@ApplyOptions<AstraeaCommandOptions>({
  name: 'help',
  aliases: ['h'],
  description: 'Gives you a list of commands',
  detailedDescription: 'You may also provide a command, which will return info about that command',
  preconditions: ['GuildTextOnly'],
  usage: '[command]'
})
export default class Help extends AstraeaCommand {
  public async run(message: Message, args: Args): Promise<Message> {
    const command = await args.pickResult('string')
    if (command.success) return await this.commandHelp(message, command.value)
    return await this.commands(message)
  }

  private async commandHelp(message: Message, cmd: string): Promise<Message> {
    const commands = this.container.stores.get('commands')
    const command: Command = commands.get(cmd.toLowerCase())

    if (typeof command === 'undefined') {
      return await message.channel.send('Couldn\'t find that command!')
    }
    const embed = new MessageEmbed()
      .setColor('dee29a')
      .setFooter(
        `${message.author.tag} | Parameter Key: <> Required, [] Optional`,
        message.author.avatarURL({ dynamic: true })
      )
      .setTitle(`Command | ${command.name}`)
      .addField('Description', command.description)

    if (command.aliases.length > 0) {
      embed.addField('Aliases', command.aliases.join(', '))
    }

    if (command.detailedDescription) {
      embed.addField('Detailed Description', command.detailedDescription)
    }

    if ((command as AstraeaCommand).usage) {
      embed.addField('Usage', `${cfg.prefix}${(command as AstraeaCommand).usage}`)
    }

    return await message.channel.send(embed)
  }

  private async commands(message: Message): Promise<Message> {
    let categories: string[] = []

    let embed = new MessageEmbed()

    // eslint-disable-next-line array-callback-return
    this.container.stores.get('commands').map((cmd: AstraeaCommand) => {
      // eslint-disable-next-line array-callback-return
      if (categories.includes(cmd.category)) return

      categories.push(cmd.category)
    })

    categories.forEach(category => {
      let commandsLine = ''
      this.container.stores.get('commands').forEach(cmd => {
        if ((cmd as AstraeaCommand).category !== category) return
        if (!this.container.client.util.isOwner(message.author.id) && (cmd as AstraeaCommand).category === 'Owner') {
          return
        }
        if (
          !(message.member.hasPermission('BAN_MEMBERS') || message.member.hasPermission('KICK_MEMBERS')) &&
          (cmd as AstraeaCommand).category === 'Moderation'
        ) {
          return
        }
        if (!(message.channel as TextChannel).nsfw && (cmd as AstraeaCommand).category === 'NSFW') return
        if (!(cmd as AstraeaCommand).enabled) return

        commandsLine += `\`${cmd.name}\` `
      })

      if (commandsLine.length < 1) return

      embed.addField(category, commandsLine)
      embed.setTimestamp()
      // embed.setThumbnail(message.author.avatarURL({ dynamic: true }))
      embed.setFooter(` - ${this.container.client.user.tag}`, this.container.client.user.avatarURL({ dynamic: true }))
    })
    return await message.channel.send(embed)
  }
}

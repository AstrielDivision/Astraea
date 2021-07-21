/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/**
 * Original: https://github.com/gitcord-project/Gitcord/blob/main/src/commands/Info/help.ts
 * Licensed under the MIT License.
 */
import { ApplyOptions } from '@sapphire/decorators'
import { Args } from '@sapphire/framework'
import { NorthCommand, NorthCommandOptions } from '../../lib/Structures/Command'
import { Message, MessageEmbed } from 'discord.js'

@ApplyOptions<NorthCommandOptions>({
	name: 'help',
	aliases: ['h'],
	description: 'Gives you a list of commands',
	detailedDescription: 'You may also provide a command, which will return info about that command',
	preconditions: [],
	runIn: ['guild']
})
export default class Help extends NorthCommand {
	public async run (message: Message, args: Args): Promise<Message> {
		const command = await args.pickResult('string')
		if (command.success) return await this.commandHelp(message, command.value)
		return await message.channel.send(this.mapCommandsToStr())
	}

	private async commandHelp (message: Message, cmd: string): Promise<Message> {
		const commands = this.container.stores.get('commands')
		const command = commands.get(cmd.toLowerCase()) ?? commands.find((cmd) => command?.name.includes(cmd))
		if (typeof command === 'undefined') return await message.channel.send('Couldn\'t find that command!')
		return await message.channel.send(
			new MessageEmbed()
				.setColor(0x1100ff)
				/* eslint-disable @typescript-eslint/restrict-template-expressions */
				.setTitle(`Command | ${command.name}`)
				.setDescription(`**Description:** ${command.description || '`No description`'}\n**In detail:** ${command.detailedDescription || '`No detailed description`'}`)
				.setFooter(`${message.author.tag}}`, message.author.avatarURL({ dynamic: true }))
		)
	}

	private mapCommandsToStr (): string {
		return this.container.stores.get('commands').map((val) => `${val.name} → ${val.description}`).join('\n')
	}
}

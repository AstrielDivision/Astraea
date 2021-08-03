/**
 * Original: https://github.com/gitcord-project/Gitcord/blob/main/src/commands/Info/help.ts
 * Licensed under the MIT License.
 */
import { ApplyOptions } from '@sapphire/decorators'
import { Args } from '@sapphire/framework'
import { AstraeaCommand, AstraeaCommandOptions } from '../../lib/Structures/Command'
import { Message, MessageEmbed } from 'discord.js'

@ApplyOptions<AstraeaCommandOptions>({
	name: 'help',
	aliases: ['h'],
	description: 'Gives you a list of commands',
	detailedDescription: 'You may also provide a command, which will return info about that command',
	preconditions: []
})
export default class Help extends AstraeaCommand {
	public async run (message: Message, args: Args): Promise<Message> {
		const command = await args.pickResult('string')
		if (command.success) return await this.commandHelp(message, command.value)
		return await this.commands(message)
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
				.setFooter(`${message.author.tag}`, message.author.avatarURL({ dynamic: true }))
		)
	}

	private async commands (message: Message): Promise<Message> {
		let categories: string[] = []

		let embed = new MessageEmbed()

		// eslint-disable-next-line array-callback-return
		this.container.stores.get('commands').map((cmd: AstraeaCommand) => {
			// eslint-disable-next-line array-callback-return
			if (categories.includes(cmd.category)) return

			categories.push(cmd.category)
		})

		categories.forEach((category) => {
			let commandsLine = ''
			this.container.stores.get('commands').forEach((cmd) => {
				if ((cmd as AstraeaCommand).category !== category) return
				if ((cmd as AstraeaCommand).category === 'Owner') return

				commandsLine += (`\`${cmd.name}\` `)
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

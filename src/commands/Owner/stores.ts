import { AstraeaCommand, AstraeaCommandOptions } from '../../lib/Structures/Command'
import { Message } from 'discord.js'
import { ApplyOptions } from '@sapphire/decorators'
import { Args } from '@sapphire/framework'

@ApplyOptions<AstraeaCommandOptions>({
	name: 'stores',
	description: 'Enable or disable certain stores',
	flags: ['c', 'command', 'listener', 'l']
})
export default class Enable extends AstraeaCommand {
	public async run (message: Message, args: Args): Promise<Message> {
		if (!this.container.client.util.isOwner(message.author.id)) {
			return await message.channel.send('You are not permitted to execute this command')
		}
		const store = (await args.pickResult('string')).value
		const commandFlag = args.getFlags('c', 'command')
		const listenerFlag = args.getFlags('l', 'listener')

		if (!store) {
			return await message.channel.send('You didn\'t provided a command name!')
		}

		if (commandFlag) return await this.command(message, store)
		if (listenerFlag) return await this.listener(message, store)

		return await message.channel.send('No flags given!\nCommand: -c or --command\nListener: -l or --listener')
	}

	private async command (message: Message, store: string): Promise<Message> {
		const commands = this.container.stores.get('commands')
		const command = commands.find(cmd => cmd.name === store.toLowerCase())

		if (!command) {
			return await message.channel.send('Command doesn\'t exist!')
		}

		if (command.enabled) {
			try {
				command.enabled = false
			} catch (err) {
				return await message.channel.send('Something went wrong...')
			}

			return await message.channel.send('Command successfully disabled')
		}

		try {
			command.enabled = true
		} catch (err) {
			return await message.channel.send('Something went wrong...')
		}

		return await message.channel.send('Command successfully enabled')
	}

	private async listener (message: Message, store: string): Promise<Message> {
		const listeners = this.container.stores.get('listeners')
		const listener = listeners.find(cmd => cmd.name === store.toLowerCase())

		if (!listener) {
			return await message.channel.send('Listener doesn\'t exist!')
		}

		if (listener.enabled) {
			try {
				listener.enabled = false
			} catch (err) {
				return await message.channel.send('Something went wrong...')
			}

			return await message.channel.send('Listener successfully disabled')
		}

		try {
			listener.enabled = true
		} catch (err) {
			return await message.channel.send('Something went wrong...')
		}

		return await message.channel.send('Listener successfully enabled')
	}
}

import { Manager } from 'erela.js'
import { TextChannel } from 'discord.js'
import Client from '../Structures/client'

export default class MusicManager {
	public client: Client
	public manager: Manager
	constructor (client: Client) {
		this.client = client

		this.manager = new Manager({
			nodes: [
				{ host: 'lavalink2.danbot.host', port: 2333, password: 'DBH' }
			],
			send (id, payload) {
				const guild = client.guilds.cache.get(id)

				if (guild) guild.shard.send(payload)
			}
		})

		this.launchEvents()
	}

	launchEvents (): void {
		/* eslint-disable no-console */
		this.manager.on('nodeConnect', (node) => console.log(`${node.options.identifier} has been connected.`))
		this.manager.on('nodeError', (node, error) => console.log(`${node.options.identifier} had an error: ${error.message}`))

		this.manager.on('trackStart', (player, track) => {
			const channel: TextChannel = this.client.channels.cache.get(player.textChannel) as TextChannel

			void channel.send(`Now playing: ${track.title}`)
		})

		this.manager.on('trackEnd', (player) => {
			const channel: TextChannel = this.client.channels.cache.get(player.textChannel) as TextChannel

			void channel.send('Track has ended.')
		})

		this.manager.on('queueEnd', (player) => {
			const channel: TextChannel = this.client.channels.cache.get(player.textChannel) as TextChannel

			void channel.send('Queue has ended.')

			player.destroy()
		})

		this.manager.on('playerDestroy', (player) => {
			const channel: TextChannel = this.client.channels.cache.get(player.textChannel) as TextChannel

			void channel.send('Leaving the voice channel.')
		})

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		this.client.on('raw', (data) => this.manager.updateVoiceState(data as any))
	}
}

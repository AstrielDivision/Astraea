import { NorthCommand, NorthCommandOptions } from '../../lib/Structures/Command'
import { Message } from 'discord.js'
import { ApplyOptions } from '@sapphire/decorators'
import { Args } from '@sapphire/framework'

@ApplyOptions<NorthCommandOptions>({
	name: 'play',
	description: 'Play music'
})
export default class example extends NorthCommand {
	public async run (message: Message, args: Args): Promise<Message> {
		if (!message.member.voice.channel) return await message.channel.send('You\'re not in a Voice Channel')

		const search = (await args.restResult('string')).value

		if (!search) return await message.channel.send('No search provided!')

		const res = await this.container.client.music.manager.search(search)
		if (res.loadType === 'LOAD_FAILED') return await message.channel.send('Failed to load! DM the developer if this continues. ArtieFuzzz#8298')
		if (res.loadType === 'PLAYLIST_LOADED') return await message.channel.send('Playlists are not supported with this command!')

		const player = this.container.client.music.manager.create({
			guild: message.guild.id,
			voiceChannel: message.member.voice.channel.id,
			textChannel: message.channel.id
		})

		player.connect()
		player.queue.add(res.tracks[0])

		if (!player.playing && !player.paused && !player.queue.size) void player.play()

		return await message.channel.send(`Added ${res.tracks[0].title} to the que!`)
	}
}

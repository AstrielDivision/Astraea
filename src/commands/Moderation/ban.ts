import { AstraeaCommand, AstraeaCommandOptions } from '../../lib/Structures/Command'
import { Message } from 'discord.js'
import { ApplyOptions, RequiresPermissions } from '@sapphire/decorators'
import { Args } from '@sapphire/framework'

@ApplyOptions<AstraeaCommandOptions>({
	name: 'ban',
	description: 'Ban a user with or without reason',
	detailedDescription: 'Using the flags -s or --soft will ban then unban the user',
	requiredClientPermissions: ['BAN_MEMBERS'],
	flags: ['s', 'soft'],
	preconditions: ['GuildTextOnly'],
	usage: '<@user | userID> [reason] [-s or --soft]'
})
export default class Ban extends AstraeaCommand {
	@RequiresPermissions('BAN_MEMBERS')
	public async run (message: Message, args: Args): Promise<Message> {
		const member = (await args.pickResult('member')).value
		const reason = (await args.restResult('string')).value
		const softBan = args.getFlags('s', 'soft')
		if (!member) return await message.channel.send('You didn\'t mention a user to ban!')

		if (!member.bannable) return await message.channel.send('You\'re not allowed to ban this user!')

		await member.ban({ reason: reason || 'Not Specified', days: 1 })

		if (softBan) {
			await member.guild.members.unban(member.id)
			return await message.channel.send(`**Successfully soft banned** \`${member.user.tag}\``)
		}

		return await message.channel.send(`**Successfully banned** \`${member.user.tag}\``)
	}
}

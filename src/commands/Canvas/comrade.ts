import { AstraeaOverlayCommand, AstraeaCommandOptions } from '../../lib/Structures/Command'
import { PieceContext } from '@sapphire/framework'
import { ApplyOptions } from '@sapphire/decorators'

@ApplyOptions<AstraeaCommandOptions>({
	name: 'comrade',
	aliases: ['russia', 'soviet', 'russian'],
	description: 'Add a soviet flag overlay to your or someone elses profile picture',
	usage: 'comrade [@user]'
})
export default class Comrade extends AstraeaOverlayCommand {
	constructor (Context: PieceContext, options: AstraeaCommandOptions) {
		super({ overlay: 'comrade' }, Context, options)
	}
}

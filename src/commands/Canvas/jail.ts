import { AstraeaOverlayCommand, AstraeaCommandOptions } from '../../lib/Structures/Command'
import { PieceContext } from '@sapphire/framework'
import { ApplyOptions } from '@sapphire/decorators'

@ApplyOptions<AstraeaCommandOptions>({
	name: 'jail',
	aliases: ['jailed'],
	description: 'Add a jail overlay to your or someone elses profile picture'
})
export default class Jail extends AstraeaOverlayCommand {
	constructor (Context: PieceContext, options: AstraeaCommandOptions) {
		super({ overlay: 'glass' }, Context, options)
	}
}

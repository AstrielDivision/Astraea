import { AstraeaOverlayCommand, AstraeaCommandOptions } from '../../lib/Structures/Command'
import { PieceContext } from '@sapphire/framework'
import { ApplyOptions } from '@sapphire/decorators'

@ApplyOptions<AstraeaCommandOptions>({
	name: 'wasted',
	description: 'Add a GTA 5 wasted overlay to your or someone elses profile picture'
})
export default class Wasted extends AstraeaOverlayCommand {
	constructor (Context: PieceContext, options: AstraeaCommandOptions) {
		super({ overlay: 'wasted' }, Context, options)
	}
}

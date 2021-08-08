import { AstraeaOverlayCommand, AstraeaCommandOptions } from '../../lib/Structures/Command'
import { PieceContext } from '@sapphire/framework'
import { ApplyOptions } from '@sapphire/decorators'

@ApplyOptions<AstraeaCommandOptions>({
	name: 'rainbow',
	description: 'Add a rainbow overlay to your or someone elses profile picture'
})
export default class Rainbow extends AstraeaOverlayCommand {
	constructor (Context: PieceContext, options: AstraeaCommandOptions) {
		super({ overlay: 'gay' }, Context, options)
	}
}

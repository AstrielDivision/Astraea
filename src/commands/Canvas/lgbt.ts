import { ApplyOptions } from '@sapphire/decorators'
import { PieceContext } from '@sapphire/framework'
import { AstraeaCommandOptions } from '../../lib/Structures/Command'
import { AstraeaOverlayCommand } from '../../lib/Structures/commands/CanvasCommand'

@ApplyOptions<AstraeaCommandOptions>({
  name: 'rainbow',
  description: 'Add a rainbow overlay to your or someone elses profile picture',
  usage: '[@user]'
})
export default class Rainbow extends AstraeaOverlayCommand {
  constructor(Context: PieceContext, options: AstraeaCommandOptions) {
    super({ overlay: 'gay' }, Context, options)
  }
}

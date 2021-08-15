import { ApplyOptions } from '@sapphire/decorators'
import { PieceContext } from '@sapphire/framework'
import { AstraeaCommandOptions } from '#lib/Structures/BaseCommand'
import { AstraeaOverlayCommand } from '#lib/Structures/commands/CanvasCommand'

@ApplyOptions<AstraeaCommandOptions>({
  name: 'jail',
  aliases: ['jailed'],
  description: 'Add a jail overlay to your or someone elses profile picture',
  usage: '[@user]'
})
export default class Jail extends AstraeaOverlayCommand {
  constructor(Context: PieceContext, options: AstraeaCommandOptions) {
    super({ overlay: 'glass' }, Context, options)
  }
}

import { Command, CommandOptions, PieceContext } from '@sapphire/framework'
import { sep } from 'path'

export abstract class AstraeaCommand extends Command {
	public usage?: string
	constructor (Context: PieceContext, options: AstraeaCommandOptions) {
		super(Context, options)

		this.usage = `${this.name} ${options.usage ?? ''}`
	}

	public get category (): string {
		const path = this.path

		const splittedPath = path.split(sep)
		const finalPath = splittedPath.slice(splittedPath.indexOf('commands') + 1, -1)

		return finalPath[0]
	}
}

export interface AstraeaCommandOptions extends CommandOptions {
	usage?: string
}

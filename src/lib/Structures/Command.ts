import { Command, CommandOptions, PieceContext } from '@sapphire/framework'

export abstract class NorthCommand extends Command {
	ownerOnly?: boolean
	constructor (Context: PieceContext, options: NorthCommandOptions) {
		super(Context, options)

		this.ownerOnly = options.ownerOnly ?? false
	}
}

export interface NorthCommandOptions extends CommandOptions {
	ownerOnly?: boolean
}

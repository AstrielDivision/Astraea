import { KSoftClient } from '@aero/ksoft'

declare module '@sapphire/framework' {
	interface SapphireClient {
		ksoft: KSoftClient
	}
}

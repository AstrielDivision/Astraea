import { KSoftClient } from '@aero/ksoft'

declare module '@sapphire/framework' {
	interface SapphireClient {
		ksoft: KSoftClient
	}
	interface ILogger {
		// eslint-disable-next-line @typescript-eslint/method-signature-style, @typescript-eslint/no-invalid-void-type
		console(...message: unknown[]): void
	}
	interface Preconditions {
		ownerOnly: never
	}
}

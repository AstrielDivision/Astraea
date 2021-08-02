import { KSoftClient } from '@aero/ksoft'
import StatusUpdater from '@tmware/status-rotate'

declare module '@sapphire/framework' {
	interface SapphireClient {
		ksoft: KSoftClient
		statusUpdater: StatusUpdater
	}
	interface ILogger {
		// eslint-disable-next-line @typescript-eslint/method-signature-style, @typescript-eslint/no-invalid-void-type
		console(...message: unknown[]): void
	}
}

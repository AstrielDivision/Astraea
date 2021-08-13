import { KSoftClient } from '@aero/ksoft'
import StatusUpdater from '@tmware/status-rotate'
import ClientUtils from './ClientUtils'
import { SapphireClientOptions } from '@sapphire/framework'

declare module '@sapphire/framework' {
  interface SapphireClient {
    ksoft: KSoftClient
    statusUpdater: StatusUpdater
    util: ClientUtils
  }
  interface ILogger {
    // eslint-disable-next-line @typescript-eslint/method-signature-style
    console(...message: unknown[]): void
  }
}
declare module 'discord.js' {
  interface ClientOptions extends SapphireClientOptions {}
}

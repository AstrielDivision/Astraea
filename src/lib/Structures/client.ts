import { SapphireClient, version } from '@sapphire/framework'
import { KSoftClient } from '@aero/ksoft'
import StatusUpdater from '@tmware/status-rotate'
import ClientUtils from '../ClientUtils'
import cfg, { pkg } from '../../config'
import { ClientOptions, version as djs } from 'discord.js'
import Yiff from '#lib/yiff.ts/index'
import mongoose from 'mongoose'
import * as Sentry from '@sentry/node'

export default class Client extends SapphireClient {
  ksoft: KSoftClient
  statusUpdater: StatusUpdater
  util: ClientUtils
  Yiff: Yiff
  constructor(options: ClientOptions) {
    super(options)

    this.ksoft = new KSoftClient(cfg.ksoft)
    this.util = new ClientUtils(this)
    this.Yiff = new Yiff(this)
    this.statusUpdater = new StatusUpdater(this, [
      {
        type: 'LISTENING',
        name: `Signals from the endless outer space | ${cfg.prefix}`
      },
      {
        type: 'LISTENING',
        name: `Music | ${cfg.prefix}`
      },
      {
        type: 'PLAYING',
        name: 'あなたは大丈夫？'
      }
    ])
  }

  /**
   * Start the Client / Bot
   * @returns {Promise<Client>}
   */
  public async start(): Promise<Client> {
    await super.login(cfg.token)
    await this.init()

    return this
  }

  private async init(): Promise<void> {
    await mongoose
      .connect(cfg.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
      })
      .then(() => this.logger.info('Connected to the Database'))
      .catch((err: Error) => this.logger.error('Could not connect to the Database\n' + err.stack))

    Sentry.init({
      dsn: cfg.sentry,
      release: `Astraea@${pkg.version}`,
      tracesSampleRate: 1.0
    })
    Sentry.setTags({
      'discord.js': djs,
      framework: version,
      version: pkg.version
    })

    // Automate status change
    setInterval(() => {
      void this.statusUpdater.updateStatus()
    }, 2 * 60 * 1000) // Change status every 2 minutes
  }
}

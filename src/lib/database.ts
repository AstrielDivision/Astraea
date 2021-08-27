import cfg from '../config'
import { DocumentStore } from 'ravendb'

const store = new DocumentStore(cfg.raven.host, cfg.raven.db)
const session = store.initialize()

export default session.openSession()

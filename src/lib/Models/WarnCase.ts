import { model, Schema } from 'mongoose'
import type { Case } from './types'

const schema = new Schema({
  case_id: { type: String, default: Date.now().toString(36).toUpperCase() },
  case_reason: { type: String, default: 'No reason set' },
  moderator_id: { type: String, required: true },
  user_id: { type: String, required: true },
  guild: { required: true, type: String },
  pardoned: { type: Boolean, default: false }
})

export default model<Case>('WarnCase', schema)

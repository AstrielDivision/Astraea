import { model, Schema, Document } from 'mongoose'

const schema = new Schema({
  case_id: { type: String, default: Date.now().toString(36).toUpperCase() },
  case_reason: { type: String, default: 'No reason set' },
  moderator_id: { type: String, required: true },
  user_id: { type: String, required: true },
  guild: { required: true, type: String },
  pardoned: { type: Boolean, default: false }
})

export default model<Case>('WarnCase', schema)

export interface Case extends Document {
  case_id?: string
  case_reason: string
  moderator_id: string
  user_id: string
  guild: string
  pardoned: boolean
}

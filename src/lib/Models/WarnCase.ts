import mongoose from 'mongoose'

const Schema = new mongoose.Schema({
  case_id: { type: String, default: Date.now().toString(36).toUpperCase() },
  case_reason: { type: String, default: 'No reason set' },
  moderator: { type: String, required: true },
  user: { type: String, required: true },
  user_id: { type: String, required: true },
  guild: { required: true, type: String },
  pardoned: { type: Boolean, default: false }
})

export default mongoose.model<Case>('WarnCase', Schema)

export interface Case extends mongoose.Document {
  case_id: string
  case_reason: string
  moderator: string
  user: string
  user_id: string
  guild: string
  pardoned: boolean
}

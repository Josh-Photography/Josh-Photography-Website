import mongoose from 'mongoose'

const jsonDataSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, index: true },
    value: { type: mongoose.Schema.Types.Mixed, required: true },
  },
  { timestamps: true }
)

export const JsonData = mongoose.models.JsonData || mongoose.model('JsonData', jsonDataSchema)
export default JsonData

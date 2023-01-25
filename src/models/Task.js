import { model, Schema } from 'mongoose'

const TaskSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    status: {
      type: String,
      require: true,
      enum: ['ACTIVE', 'COMPLETED'],
      default: 'ACTIVE',
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

const task = model('task', TaskSchema)

export default task

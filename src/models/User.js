import { model, Schema } from 'mongoose'

const UserSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    tasks: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Task',
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

const user = model('user', UserSchema)

export default user

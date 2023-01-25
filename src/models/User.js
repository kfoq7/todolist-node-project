import { model, Schema } from 'mongoose'

const UserSchema = new Schema(
  {
    username: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    tasks: [
      {
        type: Schema.Types.ObjectId,
        ref: 'task',
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

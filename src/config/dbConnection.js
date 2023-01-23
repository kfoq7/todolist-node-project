import mongoose from 'mongoose'

export const mongooseConnect = () => {
  try {
    mongoose.connect(process.env.MONGO_URL)

    console.log('Connect to MongoDB')
  } catch (error) {
    console.log(error)
  }
}

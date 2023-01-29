import mongoose from 'mongoose'

export const mongooseConnect = async () => {
  try {
    mongoose.set('strictQuery', false)
    await mongoose.connect(process.env.MONGO_URL)
    console.log('Connect to MongoDB')
  } catch (error) {
    console.log(error)
  }
}

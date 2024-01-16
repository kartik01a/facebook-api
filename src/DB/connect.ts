import mongoose from 'mongoose'

export const connectDB = (url:string) => {
  console.log("DB is connected")
    return mongoose.connect(url)
  }
  

import mongoose from 'mongoose'
import { DB } from '../configs/config'

export const connectToDatabase = () => {
  const connectionString = DB.CONNECTION_STRING
  if (!connectionString) {
    throw new Error(
      'connectToDatabase => DATABASE_CONNECTION_STRING is undefined'
    )
  }

  return mongoose
    .connect(connectionString)
    .then(() => console.log('connected to database'))
    .catch((error) => {
      console.error('connectToDatabase Error =>', error)
    })
}

export function loadModels() {
  require('./../models/act.model')
  require('./../models/message.model')
  require('./../models/admin.model')
}

import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'

dotenv.config()

const uri = process.env.MONGODB_URI
let client

const connectDB = async () => {
  if (!client) {
    client = new MongoClient(uri)
    await client.connect()
    console.log('MongoDB Connected...')
  }
  return client
}

export default connectDB

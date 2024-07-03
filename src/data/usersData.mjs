import connectDB from '../config/db.mjs'
import { ObjectId } from 'mongodb'

const readUsersFromDB = async () => {
  const client = await connectDB()
  const db = client.db('your_database_name')
  const users = await db.collection('users').find().toArray()
  return users
}

const addUserToDB = async (user) => {
  const client = await connectDB()
  const db = client.db('your_database_name')
  const result = await db.collection('users').insertOne(user)
  return result.insertedId ? { ...user, _id: result.insertedId } : null
}

const findUserById = async (id) => {
  const client = await connectDB()
  const db = client.db('your_database_name')
  const user = await db.collection('users').findOne({ _id: new ObjectId(id) })
  return user
}

const findUserByName = async (userName) => {
  const client = await connectDB()
  const db = client.db('your_database_name')
  const user = await db.collection('users').findOne({ userName })
  return user
}

const findUserByEmail = async (userEmail) => {
  const client = await connectDB()
  const db = client.db('your_database_name')
  const user = await db.collection('users').findOne({ userEmail })
  return user
}

const updateUserInDB = async (id, updatedUser) => {
  const client = await connectDB()
  const db = client.db('your_database_name')
  const result = await db.collection('users').updateOne({ _id: new ObjectId(id) }, { $set: updatedUser })
  return result.modifiedCount > 0
}

const deleteUserFromDB = async (userId) => {
  const client = await connectDB()
  const db = client.db('your_database_name')
  const result = await db.collection('users').deleteOne({ _id: new ObjectId(userId) })
  return result.deletedCount > 0
}

export { readUsersFromDB, addUserToDB, updateUserInDB, deleteUserFromDB, findUserById, findUserByName, findUserByEmail }

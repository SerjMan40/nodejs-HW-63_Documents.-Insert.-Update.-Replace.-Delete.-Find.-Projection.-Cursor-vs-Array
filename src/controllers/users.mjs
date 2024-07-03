import { deleteUserFromDB, readUsersFromDB, updateUserInDB } from '../data/usersData.mjs'

const users = await readUsersFromDB()

export const getUsersHandler = async (req, res) => {
  res.render('users/users.pug', { users })
}

export const getUserOnIdHandler = (req, res) => {
  const userId = parseInt(req.params.userId)
  const user = users.find((user) => user.userId === userId)
  if (user) {
    res.render('users/userDetail.pug', { user })
  } else {
    res.status(404).send(`User with ID ${userId} not found`)
  }
}

export const putUserOnIdHandler = (req, res) => {
  const userId = parseInt(req.params.userId)
  const { userName, password } = req.body
  const updatedUser = { userName, password }
  const isUpdated = updateUserInDB(userId, updatedUser)
  if (isUpdated) {
    res.send(`User: ${userName}, with ID: ${userId} is updated!!!`)
  } else {
    res.status(404).send(`User with ID ${userId} not found`)
  }
}

export const deleteUserOnIdHandler = (req, res) => {
  const userId = parseInt(req.params.userId)
  const deletedUser = deleteUserFromDB(userId)
  if (deletedUser) {
    res.send(`User: ${deletedUser.userName}, with ID: ${userId} was deleted!`)
  } else {
    res.status(404).send(`User with ID ${userId} not found`)
  }
}

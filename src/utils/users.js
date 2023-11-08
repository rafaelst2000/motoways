import { firestore } from './firebase'
import { collection, getDocs, addDoc, query, where } from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid'

export const getUsers = async () => {
  const users = []
  const querySnapshot = await getDocs(collection(firestore, 'users'))
  querySnapshot.forEach((doc) => {
    users.push(doc.data())
  })
  return users
}

export const getUserByEmail = async (email) => {
  const users = []
  const q = query(collection(firestore, 'users'), where('email', '==', email))
  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((doc) => {
    users.push(doc.data())
  })

  return users[0]
}

export const getUserById = async (id) => {
  const q = query(collection(firestore, 'users'), where('id', '==', id))
  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((doc) => {
    const id = uuidv4()
    console.log(id)
  })
}

export const createUserIfNotExists = async (user) => {
  if (!user && !user.email) return
  const allUsers = await getUsers()
  const userExists = allUsers.map((user) => user.email).includes(user.email)
  if (!userExists) {
    const id = uuidv4()
    const newUser = {
      id,
      email: user.email,
      image: user.image,
      name: user.name,
      member_since: new Date().toJSON().slice(0, 10),
    }
    try {
      await addDoc(collection(firestore, 'users'), { ...newUser })
      return newUser
    } catch (err) {
      console.log(err)
    }
  }
}

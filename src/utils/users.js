import { firestore } from './firebase'
import {
  collection,
  getDocs,
  addDoc,
  query,
  where,
  doc,
  updateDoc,
} from 'firebase/firestore'
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
  const users = []
  const q = query(collection(firestore, 'users'), where('id', '==', id))
  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((doc) => {
    users.push(doc.data())
  })

  return users[0]
}

export const getUserAdditionalInfo = async (id) => {
  const userRoutes = []
  const userComments = []
  const q = query(collection(firestore, 'routes'), where('user_id', '==', id))
  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((doc) => {
    userRoutes.push(doc.data())
  })

  const commentQuery = query(
    collection(firestore, 'comments'),
    where('user_id', '==', id),
  )
  const commentQuerySnapshot = await getDocs(commentQuery)
  commentQuerySnapshot.forEach((doc) => {
    userComments.push(doc.data())
  })

  const data = {
    publishedRoutes: userRoutes.length,
    km:
      userRoutes.length > 0
        ? userRoutes.reduce((total, obj) => total + obj.distance, 0)
        : 0,
    comments: userComments.length,
  }

  return data
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

export const updateUserFavoriteRoutes = async (user, favoriteRoutes) => {
  if (!user && !user.email) return
  const usersCollectionRef = collection(firestore, 'users')
  const q = query(usersCollectionRef, where('email', '==', user.email))
  const querySnapshot = await getDocs(q)
  const id = querySnapshot.docs[0].id
  await updateDoc(doc(firestore, 'users', id), {
    favorite_routes: favoriteRoutes,
  })
}

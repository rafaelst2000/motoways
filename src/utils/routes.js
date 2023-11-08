import { firestore } from './firebase'
import {
  collection,
  getDocs,
  addDoc,
  query,
  where,
  orderBy,
} from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid'

export const getUserLastRoute = async (userId) => {
  const routes = []
  const querySnapshot = await getDocs(
    collection(firestore, 'routes'),
    orderBy('publish_at', 'desc'),
    where('user_id', '==', userId),
  )
  querySnapshot.forEach((doc) => {
    routes.push(doc.data())
  })
  return routes[0]
}

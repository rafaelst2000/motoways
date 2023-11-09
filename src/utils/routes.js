import { firestore } from './firebase'
import {
  collection,
  getDocs,
  addDoc,
  query,
  where,
  orderBy,
  limit,
} from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid'
import { getUserById } from './users'

export const getUserLastRoute = async (userId = '') => {
  if (!userId) return null
  try {
    const routes = []
    const q = query(
      collection(firestore, 'routes'),
      where('user_id', '==', userId),
      orderBy('publish_at', 'desc'),
      limit(1),
    )
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      routes.push(doc.data())
    })

    return routes.length > 0 ? routes[0] : null
  } catch (error) {
    console.error('Erro ao buscar última rota do usuário:', error)
    return null
  }
}

export const getFeedRoutes = async (userId = '') => {
  if (!userId) return null
  try {
    const routes = []
    const q = query(
      collection(firestore, 'routes'),
      orderBy('user_id'),
      where('user_id', '!=', userId),
      orderBy('publish_at', 'desc'),
      limit(10),
    )
    const querySnapshot = await getDocs(q)
    const promises = []
    querySnapshot.forEach((doc) => {
      const userPromise = getUserById(doc.data().user_id).then((user) => ({
        ...doc.data(),
        user,
      }))

      promises.push(userPromise)
    })

    const resolvedRoutes = await Promise.all(promises)

    return resolvedRoutes.length > 0 ? resolvedRoutes : null
  } catch (error) {
    console.error(error)
    return null
  }
}

export const getRouteDetails = async (route) => {
  if (!route) return null
  try {
    const comments = []
    const q = query(
      collection(firestore, 'comments'),
      orderBy('route_id'),
      where('route_id', '==', route.id),
      orderBy('publish_at', 'desc'),
    )
    const querySnapshot = await getDocs(q)
    const promises = []
    querySnapshot.forEach((doc) => {
      const userPromise = getUserById(doc.data().user_id).then((user) => ({
        ...doc.data(),
        user,
      }))

      promises.push(userPromise)
    })

    const resolvedComments = await Promise.all(promises)
    return {
      ...route,
      comments: resolvedComments,
    }
  } catch (error) {
    console.error('Erro ao buscar detalhes da rota:', error)
    return null
  }
}

export const addRouteComment = async (comment) => {
  if (!comment) return
  try {
    await addDoc(collection(firestore, 'comments'), { ...comment })
  } catch (err) {
    console.log(err)
  }
}

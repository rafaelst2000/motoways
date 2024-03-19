import { firestore, storage } from './firebase'
import {
  collection,
  getDocs,
  addDoc,
  query,
  where,
  orderBy,
  limit,
} from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from '@firebase/storage'
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

export const getFilteredRoutes = async (uf = '') => {
  try {
    const q = uf
      ? query(
          collection(firestore, 'routes'),
          where('uf', '==', uf),
          orderBy('publish_at', 'desc'),
        )
      : query(collection(firestore, 'routes'), orderBy('publish_at', 'desc'))
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
    console.error('Erro ao buscar rotas:', error)
    return null
  }
}

export const getUserRoutes = async (userId = '') => {
  if (!userId) return null
  try {
    const routes = []
    const q = query(
      collection(firestore, 'routes'),
      where('user_id', '==', userId),
      orderBy('publish_at', 'desc'),
    )
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      routes.push(doc.data())
    })

    return routes.length > 0 ? routes : null
  } catch (error) {
    console.error('Erro ao buscar rotas do usuário:', error)
    return null
  }
}

export const getFeedRoutes = async (userId = '') => {
  if (!userId) return null
  try {
    const q = query(
      collection(firestore, 'routes'),
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
    const routeStops = []
    const routeStopsQuery = query(
      collection(firestore, 'route_stops'),
      where('route_id', '==', route.id),
      orderBy('index', 'asc'),
    )
    const routeStopsQuerySnapshot = await getDocs(routeStopsQuery)
    routeStopsQuerySnapshot.forEach((doc) => {
      routeStops.push(doc.data())
    })

    return {
      ...route,
      route_stops: routeStops,
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

export const createNewRoute = async (route, routeStops, files) => {
  try {
    if (files) route.images = await handleUpload(files)
    const promises = []
    await addDoc(collection(firestore, 'routes'), { ...route })
    routeStops.forEach((routeStop) => {
      const routePromise = addDoc(collection(firestore, 'route_stops'), {
        ...routeStop,
      })
      promises.push(routePromise)
    })
    await Promise.all(promises)
  } catch (err) {
    console.log(err)
  }
}

const handleUpload = async (files) => {
  if (files.length > 0) {
    const urls = []
    await Promise.all(
      Array.from(files).map(async (file) => {
        const storageRef = ref(storage, `images/${file.name}`)
        await uploadBytes(storageRef, file)
        const imageUrl = await getDownloadURL(storageRef)
        urls.push(imageUrl)
      }),
    )

    return urls
  }
}

export const getUserFavoriteRoutes = async (userId = '') => {
  if (!userId) return []
  try {
    const user = await getUserById(userId)
    const userRoutesIds = user.favorite_routes ?? []
    if (userRoutesIds.length === 0) return []

    const routes = []
    const q = query(
      collection(firestore, 'routes'),
      where('id', 'in', userRoutesIds),
      orderBy('publish_at', 'desc'),
    )

    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      routes.push(doc.data())
    })

    return routes.length > 0 ? routes : null
  } catch (error) {
    console.error('Erro ao buscar rotas favoritas do usuário:', error)
    return null
  }
}

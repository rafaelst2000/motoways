import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const config = {
  apiKey: 'AIzaSyAJrrMrVBrbQU1W-uE2nZTT7ctNICuuJD4',
  authDomain: 'motoways-tcc.firebaseapp.com',
  projectId: 'motoways-tcc',
  storageBucket: 'motoways-tcc.appspot.com',
  messagingSenderId: '532086942962',
  appId: '1:532086942962:web:974383ce0f6a0b8f36b46b',
}
const app = initializeApp(config)
const firestore = getFirestore(app)
const storage = getStorage(app)

export { firestore, storage }

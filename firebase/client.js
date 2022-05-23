import { initializeApp } from 'firebase/app'

import {
  getFirestore,
  Timestamp,
  collection,
  addDoc
} from 'firebase/firestore'

const firebaseConfig = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_APIKEY)

initializeApp(firebaseConfig)
const db = getFirestore()

export const addProduct = async ({ name, description, price, quantity }) => {
  return await addDoc(collection(db, 'products'), {
    name,
    description,
    price,
    quantity,
    createdAt: Timestamp.fromDate(new Date()),
    editedAt: Timestamp.fromDate(new Date())
  })
}

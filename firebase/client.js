import { initializeApp } from 'firebase/app'

import {
  getFirestore,
  Timestamp,
  collection,
  addDoc,
  getDocs,
  orderBy,
  query
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

const productsFirebase = (doc) => {
  const data = doc.data()
  data.id = doc.id
  const { createdAt } = data
  const { editedAt } = data

  return {
    ...data,
    createdAt: +createdAt.toDate(),
    editedAt: +editedAt.toDate()
  }
}

export const getProducts = async () => {
  let snapshots
  try {
    snapshots = await getDocs(
      query(collection(db, 'products'), orderBy('createdAt', 'desc'))
    )
  } catch (error) {
    console.log(error)
  }

  if (!snapshots) return []
  return snapshots.docs.map(productsFirebase)
}

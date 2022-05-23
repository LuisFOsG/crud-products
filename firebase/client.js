import { initializeApp } from 'firebase/app'

import {
  getStorage,
  ref,
  uploadBytesResumable,
  deleteObject
} from 'firebase/storage'

import {
  getFirestore,
  Timestamp,
  collection,
  doc,
  addDoc,
  deleteDoc,
  getDocs,
  orderBy,
  query
} from 'firebase/firestore'

const firebaseConfig = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_APIKEY)

initializeApp(firebaseConfig)
const db = getFirestore()
const storage = getStorage()

export const addProduct = async ({ name, image, description, price, quantity }) => {
  return await addDoc(collection(db, 'products'), {
    name,
    image,
    description,
    price,
    quantity,
    createdAt: Timestamp.fromDate(new Date()),
    editedAt: Timestamp.fromDate(new Date())
  })
}

export const removeProduct = async ({ id }) => {
  const document = doc(db, 'products', id)
  return await deleteDoc(document)
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

export const deleteImage = async (id) => {
  const storageRef = ref(storage, `images/${id}`)
  return await deleteObject(storageRef)
}

export const uploadImage = (file) => {
  const storageRef = ref(storage, `images/${file.name}`)
  return uploadBytesResumable(storageRef, file)
}

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
  getDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  orderBy,
  query
} from 'firebase/firestore'

const firebaseConfig = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_APIKEY)

initializeApp(firebaseConfig)
const db = getFirestore()
const storage = getStorage()

export const addProduct = async ({
  name,
  imageName,
  image,
  description,
  price,
  quantity,
  viaAdministration,
  concentration,
  pharmaceuticalForm
}) => {
  return await addDoc(collection(db, 'products'), {
    name,
    image,
    imageName,
    description,
    price,
    quantity,
    viaAdministration,
    concentration,
    pharmaceuticalForm,
    createdAt: Timestamp.fromDate(new Date()),
    editedAt: Timestamp.fromDate(new Date())
  })
}

export const editProduct = async ({
  id,
  name,
  imageName,
  image,
  description,
  price,
  quantity,
  viaAdministration,
  concentration,
  pharmaceuticalForm
}) => {
  const document = doc(db, 'products', id)
  const editedElement = {}

  if (imageName) {
    editedElement.imageName = imageName
    const docu = await getDoc(document)
    const oldImageName = docu.data().imageName
    console.log(oldImageName)
    if (imageName !== oldImageName) await deleteImage(oldImageName)
  }

  if (name) editedElement.name = name
  if (image) editedElement.image = image
  if (description) editedElement.description = description
  if (price) editedElement.price = price
  if (quantity) editedElement.quantity = quantity
  if (viaAdministration) editedElement.viaAdministration = viaAdministration
  if (concentration) editedElement.concentration = concentration
  if (pharmaceuticalForm) editedElement.pharmaceuticalForm = pharmaceuticalForm

  editedElement.editedAt = Timestamp.fromDate(new Date())

  return await updateDoc(document, editedElement)
}

export const removeProduct = async ({ id }) => {
  const document = doc(db, 'products', id)
  const docu = await getDoc(document)

  await deleteImage(docu.data().imageName)

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

export const setInfo = async ({
  id,
  title,
  description,
  image
}) => {
  const document = doc(db, 'admin', id)
  const editedElement = {}

  if (title) editedElement.title = title
  if (description) editedElement.description = description
  if (image) editedElement.image = image

  return await updateDoc(document, editedElement)
}

export const getInfo = async () => {
  let snapshots
  try {
    snapshots = await getDocs(
      query(collection(db, 'admin'))
    )
  } catch (error) {
    console.log(error)
  }

  if (!snapshots) return []
  return snapshots.docs.map((doc) => {
    const data = doc.data()
    data.id = doc.id
    return data
  })
}

export const deleteImage = async (id) => {
  const storageRef = id ? ref(storage, `images/${id}`) : null

  return storageRef ? await deleteObject(storageRef) : null
}

export const uploadImage = (file, name) => {
  const storageRef = ref(storage, name)
  return uploadBytesResumable(storageRef, file)
}

import firebase from 'firebase'
import { ref, onUnmounted } from 'vue'

const config = {
	apiKey: "AIzaSyDomO94RcSrSXLp0cj_tylhSvo0sU1tDgk",
	authDomain: "vue3-crud-de9fa.firebaseapp.com",
	projectId: "vue3-crud-de9fa",
	storageBucket: "vue3-crud-de9fa.appspot.com",
	messagingSenderId: "391716286088",
	appId: "1:391716286088:web:d015cb8c251c7f36d6f93d"
}

const firebaseApp = firebase.initializeApp(config)

const db = firebaseApp.firestore()
const usersCollection = db.collection('users')

export const createUser = user => {
  return usersCollection.add(user)
}

export const getUser = async id => {
  const user = await usersCollection.doc(id).get()
  return user.exists ? user.data() : null
}

export const updateUser = (id, user) => {
  return usersCollection.doc(id).update(user)
}

export const deleteUser = id => {
  return usersCollection.doc(id).delete()
}

export const useLoadUsers = () => {
  const users = ref([])
  const close = usersCollection.onSnapshot(snapshot => {
    users.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  })
  onUnmounted(close)
  return users
}
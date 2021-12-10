import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import firebase from 'firebase/compat/app'
import { VuesticPlugin } from 'vuestic-ui'
import 'vuestic-ui/dist/vuestic-ui.css'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
/* code from our Firebase console */
const config = {
  apiKey: 'AIzaSyB6xY5JQIcoxpCAq0wOHOgoSe4lxjsTNDU',
  authDomain: 'bookingsystem-4b238.firebaseapp.com',
  projectId: 'bookingsystem-4b238',
  storageBucket: 'bookingsystem-4b238.appspot.com',
  messagingSenderId: '182840209652',
  appId: '1:182840209652:web:790157d45018175aa7aea1',
  measurementId: 'G-DYFMNK12Q7'
}
// Initialize Firebase
firebase.initializeApp(config)
const projectAuth = firebase.auth()
const projectFirestore = firebase.firestore()
const timestamp = firebase.firestore.FieldValue.serverTimestamp

createApp(App).use(router).use(VuesticPlugin).mount('#app')

window.projectFirestore = projectFirestore

projectFirestore.settings({
  timestampInSnapshots: true
})

export { projectFirestore, timestamp, projectAuth }

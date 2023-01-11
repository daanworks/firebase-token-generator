import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import {} from 'dotenv/config'
import projects from "./projects.js";

const project = process.argv[2]
const apiKey = projects[project]
const email = process.argv[3]
const password = process.argv[4]

console.info('PROJECT:', project)
console.info('----------------------------------')

const app = initializeApp({ apiKey })
const auth = getAuth()

let user = null

if (email && password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      user = userCredential.user;
      const uid = user.uid;
      const token = user.accessToken
      console.log('UID:', uid)
      console.log()
      console.log('TOKEN:', token)
    })
    .catch((error) => {
      console.error(error.code, error.message)
    });
}

if (!email || !password) {
  signInAnonymously(auth)
    .then(() => {
      console.log('Signed in anonymously')
    })
    .catch((error) => {
      console.error(error.code, error.message)
    })
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const uid = user.uid;
      const token = await user.getIdToken(true)
      console.log('UID:', uid)
      console.log()
      console.log('TOKEN:', token)
    }
  })
}





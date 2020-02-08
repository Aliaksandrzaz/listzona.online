import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

export class AuthorizationService {
  firebaseConfig = {
    apiKey: 'AIzaSyAS3Tmzpw_YfZnpGdisPnfXZjN8BScjhL0',
    authDomain: 'lehtierittely-bc08d.firebaseapp.com',
    databaseURL: 'https://lehtierittely-bc08d.firebaseio.com',
    projectId: 'lehtierittely-bc08d',
    storageBucket: 'lehtierittely-bc08d.appspot.com',
    messagingSenderId: '455064458920',
    appId: '1:455064458920:web:b70dc58166e8de8996d49d',
  }

  constructor(private dispatch: (isLogin: boolean) => void) {
    this.init()
    this.getUserLogin()
  }

  init() {
    if (!firebase.apps.length) {
      firebase.initializeApp(this.firebaseConfig)
    }
  }

  getUserLogin() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.dispatch(true)
      } else {
        this.dispatch(false)
      }
    })
  }

  loginAuthorization(user: string, password: string) {
    firebase
      .auth()
      .signInWithEmailAndPassword(user, password)
      .then(text => {
        this.dispatch(true)
      })
      .catch(error => {
        this.dispatch(false)
      })
  }

  signOut() {
    firebase
      .auth()
      .signOut()
      .then()
      .catch()
  }
}

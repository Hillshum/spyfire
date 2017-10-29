import React from 'react'
import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyD0DH7UPPGYJuuSNoLZmVnfpYnSbCwB_r0",
  authDomain: "spyfall-127c6.firebaseapp.com",
  databaseURL: "https://spyfall-127c6.firebaseio.com",
  projectId: "spyfall-127c6",
  storageBucket: "spyfall-127c6.appspot.com",
  messagingSenderId: "707568045960"
}

firebase.initializeApp(config)

const database = firebase.database()


export default function FirebaseData(Wrapped, queries=[])   {


  return class extends React.Component {
    constructor(props) {
      super(props)
      this.listeners = {}
    }

    componentWillMount() {
      queries(database).forEach(q=>{
        const {name, ref} = q
        this.listeners[name] = ref.on('value', snapshot=>{
          this.setState({[name]: snapshot.val()})
        })

      })
    }

    render() {
      return <Wrapped {...this.state} db={database} {...this.props}/>
    }
  }
}
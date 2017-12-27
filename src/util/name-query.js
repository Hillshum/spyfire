
import {database} from './firebase'

class NameQuery {
  data = {}
  refs = []

  listen (names, cb) {
    this.stop()
    this.refs = names.map(name=> database.ref(`/users/names/${name}`) )

    // Remove names that got dropped
    this.data = names.reduce((prev, curr)=>(
      {...prev, [curr]: this.data[curr]}
    ), {})

    this.refs.forEach(ref=>{
      ref.on('value', (dataSnapshot)=>{
        this.data = {...this.data, [ref.key]: dataSnapshot.val()}
        cb(this.data)
      })
    })
  }

  stop () {
    this.refs.forEach(ref=>ref.off())
  }
}


export default NameQuery
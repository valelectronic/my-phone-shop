import { getAuth, onAuthStateChanged } from 'firebase/auth'
import  { useEffect, useState } from 'react'

export  function userAuthStatus() {

    const [loggedIn,setLoggedIn] = useState(false)
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
const auth = getAuth()
onAuthStateChanged(auth, (user)=>{
    if(user){
        setLoggedIn(true)
    }
    setLoading(false)
})
    },[])

  return{loggedIn,loading}
}

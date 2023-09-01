import { useEffect, useState } from "react"
import {getAuth, onAuthStateChanged}  from 'firebase/auth'


const useAuthstatus = () => {
const [loggedin , setloggedin] = useState(false)
const [loading, setloading] = useState(true)

useEffect(()=> {
    const auth = getAuth()
    onAuthStateChanged(auth,(user)=>{
        if (user) {
            setloggedin(true)
        }
        setloading(false)
    })
})



  return {loggedin, loading}
}

export default useAuthstatus

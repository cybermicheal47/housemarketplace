import { useLocation, useNavigate } from "react-router-dom"
import { getAuth, signInWithPopup,GoogleAuthProvider } from "firebase/auth"
import {doc,setDoc, getDoc, serverTimestamp} from 'firebase/firestore'
import {db} from '../firebase.config'
import {toast} from 'react-toastify'
import googleicon from '../assets/svg/googleIcon.svg'

function Oauth() {
const navigate = useNavigate()
const location = useLocation()

const ongoogleclick =  async () => {
   try {
    const auth = getAuth()
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth,provider)
   const user  = result.user

//check for user
   const docref = doc(db,'users',user.uid)
   const docsnap = await getDoc(docref)

// if user, doesn't exist

if (!docsnap.exists()){
    await setDoc(doc(db, 'users',user.uid),{
        name: user.displayName,
        email: user.email,
        timestamp: serverTimestamp(),
    })
}

navigate('/')


   } catch (error) {
    console.log(error)
    toast.error('Something went wrong with the Authentication , try again')
   }
}


  return (
    <div className="socialLogin">
        <p>
            Sign {location.pathname === '/signup' ?  'up' : 'in'} with
        </p>
        <button className='socialIconDiv' onClick={ongoogleclick}>
        <img className='socialIconImg' src={googleicon} alt='google' />
      </button>

   
    </div>
  )
}

export default Oauth

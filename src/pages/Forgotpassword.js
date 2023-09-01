
import { useState } from "react"

import { Link } from "react-router-dom"
import {getAuth, sendPasswordResetEmail} from 'firebase/auth'
import {toast} from 'react-toastify'
import { ReactComponent as Arrowrighticon } from "../assets/svg/keyboardArrowRightIcon.svg"


function Forgotpassword() {
const[email,setemail] =useState('')

const onChange = (e) =>{
setemail(e.target.value)
}

const onSubmit = async (e) =>{
  e.preventDefault()

try {
  const auth = getAuth()
  await sendPasswordResetEmail(auth,email)
  toast.success('Email was sent')

} catch (error) {
  
  toast.error('Could not send reset email')
}


}



  return (
    <div>
      <header>
        <p className="pageHeader">
          ForgotPassword
        </p>


        <main>
           <form onSubmit={onSubmit}>
           <input type="email"
           className="emailInput"
           placeholder="Email"
           id="email"
           value={email}
           onChange={onChange}
           />
           
           
           


<Link className="forgotPasswordLink" to='/signin'>
Sign In
</Link>

<div className='signInBar'>
            <div className='signInText'>Send Reset Link</div>
            <button className='signInButton'>
              <Arrowrighticon fill='#ffffff' width='34px' height='34px' />
            </button>
          </div>

           </form>
        </main>
      </header>
    </div>
  )
}

export default Forgotpassword

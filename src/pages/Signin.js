import { useState } from "react"
import {Link, useNavigate} from 'react-router-dom'
import { ReactComponent as  Arrowrighticon } from "../assets/svg/keyboardArrowRightIcon.svg"
import visibilityicon from '../assets/svg/visibilityIcon.svg'
import {getAuth, signInWithEmailAndPassword} from  'firebase/auth'
import {toast} from 'react-toastify'
import Oauth from "../components/Oauth"


function Signin() { 

  const [showpassword, setshowpassword] = useState(false)
 const [formdata, setformdata] = useState ({
email: '' ,
password : ''

 })

const {email,password} = formdata

const navigate = useNavigate()

 const onChange = (e) => {
  setformdata((prevstate) => ({
    ...prevstate,
    [e.target.id] : e.target.value,
  }) )
 }


 const onSubmit =  async(e) => {
  e.preventDefault()


try {
  
const auth = getAuth()

const usercredentials = await signInWithEmailAndPassword(
  auth,email,password

)

if (usercredentials.user) {
  navigate('/')
}


} catch (error) {
toast.error('bad user credentials') 
}

 }





  return ( 
    <>
    <div className="pageContainer"> 
    <header>
 <p className="pageHeader">
  Welcome Back
 </p>

 </header>

<form onSubmit={onSubmit}>
<input 
type="email"
className="emailInput"
placeholder="Email"
id = 'email'
value={email}
onChange={onChange}
/>


<div className="passwordInputDiv">
<input type={showpassword ? 'text' : 'password'} 
 className="passwordInput" placeholder="Password"
 id="password"
 value={password}
 onChange={onChange}

/>

<img src={visibilityicon} alt="show password"
className="showPassword" 

onClick={()=>
setshowpassword ((prevstate)=> !prevstate)

}


/>


</div>

<Link to = '/forgotpassword'
className="forgotPasswordLink">
  Forgot Password
</Link>

<div className='signInBar'>
            <p className='signInText'>Sign In</p>
            <button className='signInButton'>
              <Arrowrighticon fill='#ffffff' width='34px' height='34px' />
            </button>
          </div>


          <Link className="registerLink" to='/signup'>
Sign Up
</Link>

</form>

<Oauth />

<Link to='/signup' className='registerLink'>
          Sign Up 
        </Link>




    </div>
    </>
  )
}

export default Signin

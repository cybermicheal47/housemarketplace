import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify';

import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
import { setDoc, doc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase.config'

import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import Oauth from '../components/Oauth';

function Signup() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const { name, email, password } = formData

  const navigate = useNavigate()

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const auth = getAuth();
      const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredentials.user;
  
      await updateProfile(auth.currentUser, {
        displayName: name,
      });
  
const formdatacopy = {...formData}
delete formdatacopy.password
formdatacopy.timestamp = serverTimestamp();
await setDoc(doc(db, 'users', user.uid), formdatacopy)
console.log('User data saved to Firestore:', formdatacopy);

      console.log('User signed up successfully:', user);
  
      // Redirect to a different page
      navigate('/');
  
    } catch (error) {
      console.error('Error saving user data to Firestore:', error);
      console.error('Signup error:', error);
      toast.error("Something is wrong with your registeration , try again")
      if (error.code && error.message) {
        console.log('Error code:', error.code);
        console.log('Error message:', error.message);
       
      }
    }
  };
  
  return (
    <>
      <div className='pageContainer'>
        <header>
          <p className='pageHeader'>Welcome Back!</p>
        </header>

        <form onSubmit={onSubmit}>
          <input
            type='text'
            className='nameInput'
            placeholder='Name'
            id='name'
            value={name}
            onChange={onChange}
          />
          <input
            type='email'
            className='emailInput'
            placeholder='Email'
            id='email'
            value={email}
            onChange={onChange}
          />

          <div className='passwordInputDiv'>
            <input
              type={showPassword ? 'text' : 'password'}
              className='passwordInput'
              placeholder='Password'
              id='password'
              value={password}
              onChange={onChange}
            />

            <img
              src={visibilityIcon}
              alt='show password'
              className='showPassword'
              onClick={() => setShowPassword((prevState) => !prevState)}
            />
          </div>

          <Link to='/forgot-password' className='forgotPasswordLink'>
            Forgot Password
          </Link>

          <div className='signUpBar'>
            <p className='signUpText'>Sign Up</p>
            <button className='signUpButton'>
              <ArrowRightIcon fill='#ffffff' width='34px' height='34px' />
            </button>
          </div>

          <Link to='/signin' className='registerLink'>
          Sign In Instead
        </Link>
        </form>

      <Oauth />

        <Link to='/signin' className='registerLink'>
          Sign In Instead
        </Link>
      </div>
    </>
  )
}

export default Signup

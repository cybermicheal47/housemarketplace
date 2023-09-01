import  {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Explore from './pages/Explore'
import Forgotpassword from './pages/Forgotpassword'
import Offers from './pages/Offers'
import Profile from './pages/Profile'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Navbar from './components/Navbar'
import { ToastContainer } from 'react-toastify'
import  'react-toastify/dist/ReactToastify.css';
import Privateroute from './components/Privateroute'
import Category from './pages/Category'
import Createlisting from './pages/Createlisting'
import Listing from './pages/Listing'
import Contact from './pages/Contact'
import Editlisting from './pages/Editlisting'

function App() {
  return (
	<>
	<Router>
		<Routes>
			<Route path='/' element={<Explore/>}  
			/>
     <Route path='/offers' element={<Offers/>}  
			/>

<Route path='/category/:categoryName' element={<Category/>}  
			/>	
<Route path='/profile' element= {<Privateroute/>}>

<Route path='/profile' element={<Profile/>}  
			/>


</Route>

<Route path='/signin' element={<Signin/>}  
			/>

<Route path='/signup' element={<Signup/>}  
			/>
			<Route path='/forgotpassword' element={<Forgotpassword/>}  
			/>

<Route path='/createlisting' element={<Createlisting/>}  
			/>

<Route path='/editlisting/:listingid' element={<Editlisting/>}  
			/>

<Route path='/category/:categoryName/:listingid' element={<Listing/>}  
			/>



<Route path='/contact/:landlordid' element={<Contact />}  
			/>





		</Routes>
		<Navbar />
	</Router>
	<ToastContainer />
	</>
  )
}

export default App

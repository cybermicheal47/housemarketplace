import { useState, useEffect } from "react"
import { getAuth } from "firebase/auth"
import { useNavigate ,  Link } from "react-router-dom"
import { updateProfile} from 'firebase/auth'
import {updateDoc, doc, collection,
  getDocs,
  query,
  where,
  orderBy,
  deleteDoc } from 'firebase/firestore'
import {db} from '../firebase.config'
import {toast} from 'react-toastify'
import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg'
import homeIcon from '../assets/svg/homeIcon.svg'
import Listingitem from '../components/Listingitem'

function Profile() {
  const auth = getAuth()
  const [changedetails, setchangedetails] = useState(false)
  const [formdata ,setformdata]= useState({
name: auth.currentUser.displayName,
email : auth.currentUser.email

  })

const {name, email} = formdata 
const[listings, setlistings ] = useState(null)
const[loading,setloading] = useState(true)

const navigate = useNavigate()


const onLogout = () => {
  auth.signOut()
  navigate('/')
}

const onSubmit = async () => {
 try {
  if (auth.currentUser.displayName !== name) {
    //update dispaly name in firebase

    await updateProfile(auth.currentUser,{
      displayName : name
    })

const userref = doc(db, 'users', auth.currentUser.uid)
  await updateDoc(userref, {
    name
  })
  }





 } catch (error) {
  console.log(error)
  toast.error('could not update profile details')
 }
}




const onChange = (e) => {
  setformdata((prevstate)=>({
    ...prevstate,
    [e.target.id] : e.target.value,
  })
  )
}





useEffect (()=> {
  const fetchuserlistings = async () => {
    try {
      const listingref = collection(db, 'listing');
  
      const q = query(
        listingref,
        where('userRef', '==', auth.currentUser.uid),  //you can also use 'useref' instead of userRef . it's index is 
                                                       //on the database
        orderBy('timestamp', 'desc')
      );
  
      const querysnap = await getDocs(q);
      let listingall = [];
      
      querysnap.forEach((doc) => {
        listingall.push({
          id: doc.id,
          data: doc.data()
        });
      });
  
      setlistings(listingall);
      setloading(false);
    } catch (error) {
      console.error("Error fetching user listings:", error);
      // Handle the error as needed (e.g., show an error message).
    }
  };
  

fetchuserlistings()

},[auth.currentUser.uid])



const onDelete = async (listingid) => {
  if(window.confirm('Want to delete ?')){
    await deleteDoc(doc(db, 'listing', listingid))
    const updatedlistings = listings.filter((listing)=>
    listing.id !== listingid
    )

    setlistings(updatedlistings)
    toast.success("Successfully deleted")
  }
}


const onEdit = (listingid) => navigate(`/editlisting/${listingid}`)



  return   <div className='profile'>
  <header className='profileHeader'>
    <p className='pageHeader'>My Profile</p>
    <button type='button' className='logOut' onClick={onLogout}>
      Logout
    </button>
    </header>



    <main>
        <div className='profileDetailsHeader'>
          <p className='profileDetailsText'>Personal Details</p>
          <p
            className='changePersonalDetails'
            onClick={() => {
              changedetails && onSubmit()
              setchangedetails((prevState) => !prevState)
            }}
          >
            {changedetails ? 'done' : 'change'}
          </p>
        </div>

<div className="profileCard">

<form>
  <input
  type="text"
  id="name"
  className={!changedetails ? 'profileName' : 'profileNameActive'}
  disabled={!changedetails}
  value={name}
  onChange={onChange} />

<input
  type="text"
  id="email"
  className={!changedetails ? 'profileEmail' : 'profileEmailActive'}
  disabled={!changedetails}
  value={email}
  onChange={onChange} />


</form>


</div>


<Link to='/createlisting' className="createListing">
  <img src={homeIcon} alt="home" />
<p>Sell or rent your Home</p>
 <img src={arrowRight} alt="arrow" />
</Link>


{!loading && listings?.length > 0 &&  (
<>
<p className="lisitingText">
  YOUR LISTING
</p>
<ul className="listingList">

{listings.map((listing)=>(

  <Listingitem key={listing.id} listing={listing.data}   id={listing.id} 
  onDelete={()=> onDelete(listing.id)}
  onEdit={()=> onEdit(listing.id)}
  
  />
))}

</ul>

</>

)}







        </main>


    </div>
 
  

}

export default Profile

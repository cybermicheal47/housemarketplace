import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import Listingitem from '../components/Listingitem'

function Offers() {
const [listings, setlistings] = useState(null)
const [loading, setloading] = useState(true)
const [lastfetchlisting , setfetchlisting] = useState(null)
const params = useParams()


useEffect(()=> {

const fetchlistings = async () => {
try {

  //get reference
  const listingref = collection(db, 'listing')

//create a query

const q = query(
  listingref,
  where('offer', '==', true ),
  orderBy('timestamp', 'desc'),
  limit(10)
)
//execute query
const querysnap =await getDocs(q)
 


const lastvisibile = querysnap.docs[querysnap.docs.length - 1]
setfetchlisting(lastvisibile)






let listings = []

querysnap.forEach((doc) => {
return listings.push ({
  id : doc.id,
  data: doc.data()

})
} )


setlistings(listings)
setloading(false)




} catch (error) {
  console.error(error)
  toast.error("could not fetch  the lists")
}
}
fetchlistings()

}, [])





//Pagination / Load More
const OnfetchMorelistings = async () => {
  try {
  
    //get reference
    const listingref = collection(db, 'listing')
  
  //create a query
  
  const q = query(
    listingref,
    where('offer', '==', true ),
    orderBy('timestamp', 'desc'),
    startAfter(lastfetchlisting),
    limit(10)
  )
  //execute query
  const querysnap =await getDocs(q)
  
  const lastvisibile = querysnap.docs[querysnap.docs.length - 1]
  setfetchlisting(lastvisibile)
  
  let listings = []
  
  querysnap.forEach((doc) => {
  return listings.push ({
    id : doc.id,
    data: doc.data()
  
  })
  } )
  
  
  setlistings((prevState)=> [...prevState, ...listings])
  setloading(false)
  
  
  
  
  } catch (error) {
    console.error(error)
    toast.error("could not fetch  the lists")
  }
  }








  return (
    < div className='category'
    >
      <header>
      <p className='pageHeader'>
       OFFERS 
       </p>
        </header> 
        {
          loading ? (
            <Spinner />
          ) : listings && listings.length > 0 ? (<>
          
          <main>
            <ul className='categoryListings'>
              {listings.map((listing)=> (
               <Listingitem listing={listing.data} id={listing.id} key={listing.id} />
              )
              )}
            </ul>
          </main>
          <br />
          <br />
          {
            lastfetchlisting && (
              <p onClick={OnfetchMorelistings}    className='loadMore'>Load More</p>
            )
          }
          
          
           </>) : (<p>
           There Are No Current Offers At The Moment
          </p>)
        }
   
    </div>
  )
}


export default Offers

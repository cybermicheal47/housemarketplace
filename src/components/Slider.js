import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore'
import { db } from '../firebase.config'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
 
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/a11y';
import Spinner  from './Spinner';
function Slider() {

const [loading, setloading] = useState(true)
const [listings, setlistings] = useState('')

const navigate = useNavigate()
useEffect( () => {

const fetchListing = async () => {

    const listingref = collection(db, 'listing')
    const q = query(listingref, orderBy('timestamp','desc'),limit(5))
     const querysnap = await getDocs(q)
     
     let listingsinfo = []
    
     querysnap.forEach((doc)=>{
        return listingsinfo.push ({
            id: doc.id,
            data: doc.data()
        })
     })
    

      
    setlistings(listingsinfo)
    setloading(false)
    

}


fetchListing()
},[])
 if(loading){
    <Spinner/>
 }

 


  return (
listings && (
    <>

<p className='exploreHeading'>Recommended</p>

    <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        slidesPerView={1}
        pagination={{ clickable: true }}
        navigation
      >
        {listings.map(({ data, id }) => {
          return (
            <SwiperSlide
              key={id}
              onClick={() => navigate(`/category/${data.type}/${id}`)}
            >
              <div
                style={{
                  background: `url(${data.imageUrls[0]}) center no-repeat`,
                  backgroundSize: 'cover',
                  padding: '150px',
                }}
                className="swipeSlideDiv"
              >
                <p className="swiperSlideText">{data.name}</p>
                <p className="swiperSlidePrice">
                  ${data.discountedPrice ?? data.regularPrice}{' '}
                  {data.type === 'rent' && '/month'}
                </p>
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>
    
    
    </>
)
  )
}

export default Slider

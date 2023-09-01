import { useNavigate,useLocation, Route } from "react-router-dom"


import { ReactComponent as Offericon } from  "../assets/svg/localOfferIcon.svg"
import { ReactComponent as Exploreicon } from "../assets/svg/exploreIcon.svg"
import { ReactComponent as Personoutlineicon } from "../assets/svg/personOutlineIcon.svg"




function Navbar() {
const navigate = useNavigate()
const location = useLocation()


const pathmatchroute = (route) => {
if  (route === location.pathname){
    return true
}
}


  return (
    <footer className='navbar'>
    <nav className='navbarNav'>
    <ul className='navbarListItems'>
      <li className='navbarListItem' onClick={()=> navigate('/')} >
        <Exploreicon
          fill= {pathmatchroute('/') ? '#2c2c2c' : '#8f8f8f'} width= '36px' height='36px' />
        <p className={
                pathmatchroute('/')
                  ? 'navbarListItemNameActive'
                  : 'navbarListItemName'
              }
         
        >
          Explore
        </p>
      </li>


      <li className='navbarListItem' onClick={()=> navigate('/offers')} >
        <Offericon
          fill= {pathmatchroute('/offers') ? '#2c2c2c' : '#8f8f8f'} width= '36px' height='36px' />
        <p className={
                pathmatchroute('/offers')
                  ? 'navbarListItemNameActive'
                  : 'navbarListItemName'
              }
         
        >
         Offers
        </p>
      </li>





      <li className='navbarListItem'  onClick={()=> navigate('/profile')} >
        <Personoutlineicon
        fill= {pathmatchroute('/profile') ? '#2c2c2c' : '#8f8f8f'} width= '36px' height='36px' />
        <p className={
                pathmatchroute('/profile')
                  ? 'navbarListItemNameActive'
                  : 'navbarListItemName'
              }
         
        >
         Profile
        </p>
      </li>





</ul>
</nav>

  </footer>
  )
}

export default Navbar

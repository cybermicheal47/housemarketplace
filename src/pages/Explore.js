import {Link} from 'react-router-dom'
import rentcategoryimage from '../assets/jpg/rentCategoryImage.jpg'
import sellcategoryimage from '../assets/jpg/sellCategoryImage.jpg'
import Slider from '../components/Slider'


function Explore() {
  return (
    <div className='explore'>
      <header>
        <p className='pageHeader'>
          Explore
        </p>
      </header>
      <Slider />
   
<main>


<p className='exploreCategoryHeading'>Categories</p>
        <div className='exploreCategories'>
          <Link to='/category/rent'>
            <img
              src={rentcategoryimage}
              alt='rent'
              className='exploreCategoryImg'
            />
            <p className='exploreCategoryName'>Places for rent</p>
          </Link>
          <Link to='/category/sale'>
            <img
              src={sellcategoryimage}
              alt='sell'
              className='exploreCategoryImg'
            />
            <p className='exploreCategoryName'>Places for sale</p>
          </Link>
        </div>
</main>


    </div>
  )
}

export default Explore

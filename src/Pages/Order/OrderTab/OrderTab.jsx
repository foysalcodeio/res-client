import FoodCard from '../../../Components/FoodCard/FoodCard'
import { Swiper, SwiperSlide } from 'swiper/react'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
// Import required modules
import { Pagination } from 'swiper/modules'

const chunkArray = (array, size) => {
  let chunk = []
  for (let i = 0; i < array.length; i += size) {
    chunk.push(array.slice(i, i + size))
  }
  return chunk
}

const OrderTab = ({ items }) => {
  const itemsPerPage = 3 // Use this variable for consistency
  const paginatedItems = chunkArray(items, itemsPerPage)

  const pagination = {
    clickable: true
  }

  return (
    <div>
      <Swiper pagination={pagination} modules={[Pagination]} className='mySwiper'>
        {paginatedItems.map((pageItem, pageIndex) => (
          <SwiperSlide key={pageIndex}> {/* ✅ Add return statement */}
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
              {pageItem.map(item => (
                <FoodCard key={item._id} item={item} />
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default OrderTab

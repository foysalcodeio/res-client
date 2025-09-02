import React, { useEffect, useState } from 'react'
import SectionTitle from '../../../Components/SectionTitle/SectionTitle'
import { Swiper, SwiperSlide } from 'swiper/react'
// import required modules
import { Navigation } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'

import { FaCommentAlt } from "react-icons/fa";


const Testimonials = () => {
  const [reviews, setReviews] = useState([])
  useEffect(() => {
    fetch('http://localhost:5000/review')
      .then(res => res.json())
      .then(data => setReviews(data))
  }, [])
  return (
    <section className='my-20'>
      <SectionTitle
        subHeading='what our client say'
        heading={'Testimonial'}
      ></SectionTitle>

      <Swiper navigation={true} modules={[Navigation]} className='mySwiper'>
        {reviews.map(review => (
          <SwiperSlide key={review._id}>

            <div className='m-24 flex flex-col items-center mx-24 my-16'>
              <Rating style={{ maxWidth: 150 }} value={review.rating} readOnly />
              <FaCommentAlt className='md:mt-5 md:text-6xl '  />
              <p className='py-8'>{review.details}</p>
              <h3 className='text-2xl text-orange-400'>{review.name}</h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default Testimonials

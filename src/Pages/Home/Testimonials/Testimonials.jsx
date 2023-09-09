import React, { useEffect, useState } from "react";
import SectionTitle from "../../../Components/SectionTitle";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("reviews.json")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);

  return (
    <div>
      <SectionTitle
        subHeading={"What Our Clients Say"}
        heading={"TESTIMONIALS"}
      ></SectionTitle>

      <Swiper navigation={true} modules={[Navigation]} className="mySwiper my-16 flex flex-col">
        {reviews.map((review) => (
          <SwiperSlide key={review._id}>
            <div className="m-16 flex flex-col items-center">
              <Rating
                style={{ maxWidth: 180 }}
                value={review.rating}
                readOnly
              />
              <p className="my-6">{review.details}</p>
              <h3 className="text-2xl text-orange-500 font-semibold">{review.name}</h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimonials;

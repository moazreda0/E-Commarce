import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import Slider from "react-slick";

export default function CategorySlider() {
  async function getCategorySlider() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }
  const { data } = useQuery("categorySlider", getCategorySlider);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToScroll: 4,
    slidesToShow: 4
  
  };
  return (
    <section>
    <div className="slider-container pb-5">
      <Slider {...settings}>
          {data?.data.data.map(function(item , idx) {
            return <div key={idx}>
              <img src= {item.image} className="w-full h-[300px]" alt="" />
              <h2 className=" text-green-600 text-center text-2xl font-semibold">{item.name}</h2>

            </div>
          } )}

        </Slider>
        </div>

    </section>
  );
}

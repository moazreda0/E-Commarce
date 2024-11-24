import React from "react";
import Slider from "react-slick";
import img1  from "./../../assets/images/slider-image-1.jpeg"
import img2 from "./../../assets/images/slider-image-2.jpeg"
import img3  from "./../../assets/images/slider-image-3.jpeg"
import img4  from "./../../assets/images/blog-img-1.jpeg"
import img5  from "./../../assets/images/blog-img-2.jpeg"

export default function HomeSlider () {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <section className="pb-5 ">
      <div className="flex flex-wrap items-center justify-center">
        <div className="w-2/3">
        <Slider {...settings}>
      <div> <img src={img1} className="w-full h-[400px]" alt="" /></div> 
      <div> <img src={img2} className="w-full h-[400px]" alt="" /></div>
      <div> <img src={img3} className="w-full h-[400px]" alt="" /></div>
      </Slider></div>
      <div className="w-1/3">
      <div> <img src={img4} className="w-full block h-[200px]" alt="" /></div>
      <div> <img src={img5} className="w-full block h-[200px]" alt="" /></div>
      
      
      </div>
      </div>
      
    </section>
  );
}

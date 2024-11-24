import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../Loading/Loading";
import Slider from "react-slick/lib/slider";
import RelatedProduct from "../relatedProduct/relatedProduct";
import { addToCart } from "../../cartService";

export default function ProductDetails() {
  var Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  
  const { id } = useParams();
 

  const [ProductDetails, setproductDetails] = useState(null);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    getproductDetails();
  }, []);

  async function getproductDetails() {
    setisLoading(true);
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${id}`
      );
      setproductDetails(data.data);
    } catch (error) {
      console.error("Failed to fetch product details:", error);
    }
    setisLoading(false);
  }

  

  return (
    <section className="py-6">
      <div className="w-full md:w-[80%] mx-auto">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <div className="flex flex-wrap justify-center items-center">
              <div className="md:w-1/3 sm:w-2/5 w-full p-5">
                <Slider {...Settings}>
                  {ProductDetails?.images.map((img, index) => (
                    <img src={img} key={index} className="w-full" alt="Product" />
                  ))}
                </Slider>
              </div>
              <div className="sm:w-3/5 md:w-2/3 w-full p-5">
                <h2 className="text-2xl font-semibold mb-3">
                  {ProductDetails?.title}
                </h2>
                <h2 className="text-xl font-normal text-green-800 mb-3">
                  {ProductDetails?.description}
                </h2>
                <h2 className="text-1xl text-green-600 font-semibold mb-3">
                  {ProductDetails?.category.name}
                </h2>
                <div className="flex justify-between items-center mt-3">
                  <h2>{ProductDetails?.price} EGP</h2>
                  <div className="flex items-center pr-3">
                    <div className="relative w-6 h-6">
                      <i className="fa-solid fa-star text-gray-300 absolute top-0 left-0 w-full h-full"></i>
                      <i
                        className="fa-solid fa-star text-yellow-300 absolute top-0 left-0 w-full h-full"
                        style={{
                          width: `${(ProductDetails?.ratingsAverage / 5) * 100}%`,
                          overflow: "hidden",
                        }}
                      ></i>
                    </div>
                    <h6 className="ml-2">{ProductDetails?.ratingsAverage}</h6>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-3">
                  <i className="fa-solid fa-heart text-red-700 fa-xl"></i>
                  <button
                    type="button"
                    onClick={() => addToCart(ProductDetails?._id,ProductDetails?.title)}
                    className="w-[80%] text-white bg-green-700 hover:bg-green-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 mt-3"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
            <RelatedProduct />
          </>
        )}
      </div>
    </section>
  );
}

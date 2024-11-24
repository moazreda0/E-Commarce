import axios from "axios";
import { BallTriangle } from "react-loader-spinner";
import { useQuery } from "react-query";
import HomeSlider from "../HomeSlider/HomeSlider";
import CategorySlider from "../CategorySlider/CategorySlider ";
import { Link } from "react-router-dom";
import { addToCart } from "../../cartService";
import { Helmet } from "react-helmet";
import { addToWishCart, getWishCart, removeFromWishCart } from "../../wishCart";
import {useState, useEffect } from "react";
import toast from "react-hot-toast";

const Products = () => {
  const [wishCart, setWishCart] = useState({});

  async function getAllProducts() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }


  const { data, isLoading, isFetching } = useQuery("products", getAllProducts);
  useEffect(() => {
    const fetchWishCart = async () => {
      try {
        const wishListData = await getWishCart(); // هيرجع Array من المنتجات
        const WishCartMap = {}; // تحويل الـ Array لـ Object للتسهيل
        wishListData.forEach(item => {
          WishCartMap[item._id] = true;
        });
        setWishCart(WishCartMap);
      } catch (error) {
        toast.error("فشل في تحميل قائمة الرغبات");
      }
    };
    fetchWishCart();
  }, []);
  if (isLoading) {
    return (
      <div className="h-[550px] flex flex-col justify-center items-center ">
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="#4fa94d"
          ariaLabel="ball-triangle-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }

  
  async function toggleWishCart(productId, productName) {
    try {
      if (wishCart[productId]) {
        await removeFromWishCart(productId, productName);
        setWishCart((prev) => {
          const updatedCart = { ...prev };
          delete updatedCart[productId];
          return updatedCart;
        });
      } else {
        await addToWishCart(productId, productName);
        setWishCart((prev) => ({
          ...prev,
          [productId]: true,
        }));
      }
    } catch (error) {
      toast.error("Failed to update WishCart");
    } }
  return (
    <>
      <Helmet>
        <title>E-Commarce</title>
      </Helmet>
      <section className="py-8 min-h-screen">
        <div className="w-full md:[90%] m-auto px-[40px]">
          <HomeSlider />

          <CategorySlider />
          <div className="row flex flex-wrap justify-center items-center  ">
            {data?.data.data.map((product, idxX) => (
              <div
                key={idxX}
                className="col w-1/2 sm:w-1/2 md:w-1/3 lg:w-1/5  p-3  "
              >
                <div className="inner p-3 hover:shadow-lg hover:shadow-green-300 hover:border rounded-lg border border-transparent hover:border-green-500 transition duration-300">
                  <Link to={"/ProductDetails/" + product._id}>
                    <img
                      src={product.imageCover}
                      alt="wdwd"
                      className="w-full  "
                    />
                    <h2 className=" text-green-500 mt-3 ">
                      {product.category.name}
                    </h2>

                    <h2 className="  mt-3 ">
                      {product.title.split(" ").slice(0, 2).join("")}
                    </h2>
                  </Link>

                  <div className=" flex flex-wrap justify-between items-center    ">
                    <div>
                      <h2 className="">{product.price} Egp </h2>
                    </div>

                    <div className="flex items-center">
                      <div className="relative w-6 h-6">
                        {/* تحديد حجم محدد للنجمة */}
                        <i className="fa-solid fa-star text-gray-300 absolute top-0 left-0 w-full h-full"></i>
                        <i
                          className="fa-solid fa-star text-yellow-300 absolute top-0 left-0 w-full h-full"
                          style={{
                            width: `${(product.ratingsAverage / 5) * 100}%`,
                            overflow: "hidden",
                          }}
                        ></i>
                      </div>
                      <h6 className="ml-2">{product.ratingsAverage}</h6>
                    </div>
                  </div>
                  <div className="flex flex-wrap justify-between items-center">
                    <i
                      onClick={() => toggleWishCart(product._id, product.title)}
                      className={`fa-heart text-2xl cursor-pointer ${
                        wishCart[product._id]
                          ? "fa-solid text-red-500"
                          : "fa-regular text-gray-700"
                      }`}
                    ></i>
                    <button
                      onClick={() => addToCart(product._id, product.title)}
                      type="button"
                      className="w-[90%] focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mx-2 mb-1 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 mt-3 "
                    >
                      add to card
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Products;

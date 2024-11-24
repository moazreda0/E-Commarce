import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { BallTriangle } from 'react-loader-spinner';
import { removeFromWishCart } from '../../wishCart';
import { addToCart } from '../../cartService';
import toast from 'react-hot-toast';

export default function WishCart() {
  const [wishList, setWishList] = useState([]); // تعديل: تهيئة wishList كـ array
  const [isLoading, setIsLoading] = useState(true);

  async function getUserWishList() {
    try {
      setIsLoading(true);
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', {
        headers: { token: localStorage.getItem('tkn') },
      });
      console.log(data);
      setWishList(data.data); // تخزين البيانات مباشرة في wishList
      setIsLoading(false);
    } catch (error) {
      toast.error('Error fetching wishlist');
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getUserWishList(); 
  }, []);

  return (
    <>
      <Helmet>
        <title>WishCart</title>
      </Helmet>
      <div className="bg-gray-100 pt-20 min-h-screen">
        <h1 className="mb-10 text-center text-2xl font-bold">My Wish Cart</h1>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
          <div className="rounded-lg md:w-2/3">
            {isLoading ? (
              <div className="h-[550px] flex justify-center items-center">
                <BallTriangle height={100} width={100} color="#4fa94d" visible />
              </div>
            ) : wishList.length > 0 ? (
              wishList.map((item, idx) => (
                <div key={idx} className="mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                  <img
                    src={item.imageCover}
                    alt={item.title}
                    className="w-full rounded-lg sm:w-40"
                  />
                  <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                    <div>
                      <h2 className="text-lg font-bold text-gray-900">{item.title}</h2>
                      <p className="mt-1 text-xl text-green-500">{item.price} EGP</p>
                      <i
                        onClick={() => {
                          removeFromWishCart(item._id, item.title);
                          setWishList(wishList.filter((wish) => wish._id !== item._id));
                        }}
                        className="fa-solid fa-trash text-red-700 my-3 hover:text-red-500 cursor-pointer"
                      >
                        Remove
                      </i>
                    </div>
                    <div>
                      <button
                        onClick={() => {
                          addToCart(item._id, item.title);
                          removeFromWishCart(item._id, item.title);
                          setWishList(wishList.filter((wish) => wish._id !== item._id));
                        }}
                        className="bg-green-700 hover:bg-green-800 text-white rounded-lg px-5 py-2.5"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-20">
                <p className="text-gray-700 text-3xl">Your wish list is empty</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BallTriangle } from "react-loader-spinner"; 
import imgCrat from "./../../assets/images/empty-cart.png";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Cart() {
  const [Cart, setCart] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isIncreaseLoad, setIsIncreaseLoad] = useState(null);
  const [isDecreaseLoad, setIsDecreaseLoad] = useState(null);


  useEffect(() => {
    getUserCart();
  }, []);
  

  
  async function removeProductFromCart(productId) {
    
    let {data}=await  axios.delete("https://ecommerce.routemisr.com/api/v1/cart/" + productId ,{
      headers :{token : localStorage.getItem("tkn")}
    })
    setCart(data);
    getUserCart(); 

    toast.error( "Product has been removed from the cart");

  }
  async function getUserCart() {
    setIsLoading(true); 
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/cart",
      {
        headers: { token: localStorage.getItem("tkn") },
      }
    );
    setCart(data.data);
    setIsLoading(false);
  }
  async function UpdateCartProduct (productId ,count,originalCount) {
    if (count !=0) { 
      if (count > originalCount ) {
        setIsIncreaseLoad(productId);
      } else {
        setIsDecreaseLoad(productId);

      }

       let{data} = await axios.put("https://ecommerce.routemisr.com/api/v1/cart/"+ productId ,{
      count} ,  {
        headers: { token: localStorage.getItem("tkn") },
      }
    )
    
    setCart(prevCart => {
      const updatedProducts = prevCart.products.map((product) =>
        product.product._id === productId ? { ...product, count } : product
      );
    
      // إعادة حساب المجموع الإجمالي بعد تحديث العدد
      const updatedTotalPrice = updatedProducts.reduce(
        (total, product) => total + product.price * product.count,
        0
      );
    
      return {
        ...prevCart,
        products: updatedProducts,
        totalCartPrice: updatedTotalPrice,
      };
    });
      
      
    } else {
      removeProductFromCart(productId)
    }
  
    setIsIncreaseLoad(false);
    setIsDecreaseLoad(false);

    
  }
  async function clearCart() {
    let { data } = await axios.delete(
      "https://ecommerce.routemisr.com/api/v1/cart",
      {
        headers: { token: localStorage.getItem("tkn") },
      }
    );
    setCart(null);
    toast.success('Cart has been cleared successfully');
   
  }
    return <>
 <Helmet>
          <title>Cart</title>

        </Helmet>
  <div className=" bg-gray-100 pt-20  min-h-screen ">
    <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
    <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
      <div className="rounded-lg md:w-2/3">
      {isLoading ? (
             <div className="h-[550px] flex flex-wrap justify-center items-center  ">
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
            ) : Cart?.products?.length > 0 ? (
              Cart.products.map((product, index ) => (
              <div
                key={index} className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
        <img src={ product. product.imageCover} alt="product-image" className="w-full rounded-lg sm:w-40" />
        <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
          <div className="mt-5 sm:mt-0">
            <h2 className="text-lg font-bold text-gray-900">${product. product.title}</h2>
            <p className="mt-1 text-xs text-gray-700">${ product.price}</p>
          </div>
          <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
            <div className="flex items-center border-gray-100">
              <span onClick={ () => UpdateCartProduct(product.product._id,product.count-1,product.count)  } className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"> 
              {isDecreaseLoad  === product.product._id  ? (<i className="fas fa-spinner fa-spin"></i>) : ('-') }</span>
              <input className="h-8 w-12 border bg-white text-center text-xs outline-none" type="number"   value ={product.count}  min="1" readOnly  />
              <span onClick={ () => UpdateCartProduct(product.product._id,product.count+1,product.count) }  className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"> 
                {isIncreaseLoad  === product.product._id  ? (<i className="fas fa-spinner fa-spin"></i>) : ('+') }</span>
            </div>
            <div className="flex items-center space-x-4">
              <p className="text-sm">${ product.price *product.count}</p>
               <svg onClick={ () => removeProductFromCart (product?.product._id )} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg> 
            </div>
          </div>
        </div>
      </div>
     ) )  ) : ( <div className="text-center py-20"> 
      <p className="text-center text-gray-700 text-3xl ">Your cart is empty</p> 
      <img src={imgCrat} alt="Empty Cart" className="mx-auto w-48 h-48" />
      </div>
    ) }
    
       
        
      </div>
      <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
        <div className="mb-2 flex justify-between">
          <p className="text-gray-700">Subtotal</p>
          <p className="text-gray-700">${Cart?.totalCartPrice } EGP</p>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-700">Shipping</p>
          <p className="text-gray-700">0</p>
        </div>
        <hr className="my-4" />
        <div className="flex justify-between">
          <p className="text-lg font-bold">Total</p>
          <div className="">
            <p className="mb-1 text-lg font-bold">${Cart?.totalCartPrice } EGP</p>
            <p className="text-sm text-gray-700">including VAT</p>
          </div>  
        </div>
      
        <Link to={"/ShipingAddress/"+ Cart?._id}  className="mt-6  block text-center rounded-md bg-green-700 py-1.5 font-medium text-white hover:bg-green-500 ">Check out</Link>
        <button onClick={clearCart} type="button" className=  "mt-6  w-full  text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-md text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Clear Cart</button>

      </div>
    </div>
  </div>


  </>;
}

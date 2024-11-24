
import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import * as Yup from "yup";
import { authContext } from "../../Context/AuthContext";
import { useParams } from "react-router-dom";


export default function ShipingAddress() { 
  const [isLoading, SetisLoading] = useState(false);
  const {cartId  } = useParams()
  
     const { setToken } = useContext(authContext);
  const user = {
    details: "",
    phone: "",
    city: "",
    
  };

  const validation = Yup.object().shape({
    details : Yup.string()
      .required("details is required"),
      phone: Yup.string()
      .required("Phone number is required")
      .matches(
        /^01[01235]\d{8}$/,
        "Phone number must be exactly 11 digits and start with 01 followed by 0, 1, 2, 3, or 5",
        "enter egy number"
      ),
      city: Yup.string()
      .required("city is required"),

  
  });

  async function onSubmitButton(Values) {
    SetisLoading(true);
   
      await axios.post(
        "https://ecommerce.routemisr.com/api/v1/orders/checkout-session/"+cartId ,
        {shippingAddress : Values} , {
          headers: { token: localStorage.getItem("tkn") },params : {url :'http://localhost:3000'}
        }
      ).then(({data})  => {
        SetisLoading(false);
        location.href= data.session.url ;
      }).catch((err)=>{
        SetisLoading(false);
      })
    
  }

  const formic = useFormik({
    initialValues: user,
    onSubmit: onSubmitButton,
    validationSchema: validation,
  });
  return (
    <div className="py-5">
      <h1 className="mb-5 text-green-700 text-5xl font-bold text-center">
         Enter Your shipping Address
      </h1>
      <div className="md:w-[60%] mx-auto md:p-0 p-5  ">
        <form onSubmit={formic.handleSubmit}>
          <div className="relative z-0 w-full mb-7 group ">
            <input
              type="text"
              name="city"
              id="city"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-700 focus:outline-none focus:ring-0 focus:border-green-700 peer"
              placeholder=" "
              value={formic.values.city}
              onChange={formic.handleChange}
              onBlur={formic.handleBlur}
            />
            <label
              forhtml="city"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-700 peer-focus:dark:text-green-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              city
            </label>
          </div>
          
          <div className="relative z-0 w-full mb-7 group ">
            <input
              type="text"
              name="details"
              id="details"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-700 focus:outline-none focus:ring-0 focus:border-green-700 peer"
              placeholder=" "
              value={formic.values.details}
              onChange={formic.handleChange}
              onBlur={formic.handleBlur}
            />
            <label
              forhtml="details"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-700 peer-focus:dark:text-green-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              details
            </label>
          </div>
          <div className="relative z-0 w-full mb-7 group ">
            <input
              type="phone"
              name="phone"
              id="phone"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-700 focus:outline-none focus:ring-0 focus:border-green-700 peer"
              placeholder=" "
              value={formic.values.phone}
              onChange={formic.handleChange}
              onBlur={formic.handleBlur}
            />
            <label
              forhtml="phone"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-700 peer-focus:dark:text-green-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              phone
            </label>
          </div>

          <button
            type="submit"
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
          >
            {isLoading == true ? (
              <i className="fa-solid fa-spinner fa-spin-pulse"></i>
            ) : (
              "Pay Now"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};


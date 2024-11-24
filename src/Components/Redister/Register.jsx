import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const Register = () => {
  const user = {
    name: "",
    email: "",
    phone: "",
    password: "",
    rePassword: "",
  };
  const [isLoading, SetisLoading] = useState(false);
  const navigate = useNavigate();
  const validation = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters")
      .max(20, "Name must be at most 20 characters"),
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address")
      .min(3, "Email must be at least 3 characters")
      .max(50, "Email must be at most 50 characters"),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(
        /^01[01235]\d{8}$/,
        "Phone number must be exactly 11 digits and start with 01 followed by 0, 1, 2, 3, or 5",
        "enter egy number"
      ),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password must be at most 20 characters")
      .matches(
        /^[A-Z][a-z0-9]{4,10}$/,
        "Password must start with an uppercase letter"
      ),
    rePassword: Yup.string()
      .required("Please confirm your password")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });

  async function registeruser(Values) {
    SetisLoading(true);
    try {
      const res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        Values
      );
      toast.success(res.data.message);
      SetisLoading(false);
      navigate("/Login");
    } catch (err) {
      toast.error(err.response.data.message, { position: "top-center" });
    }
    SetisLoading(false);
  }

  const formic = useFormik({
    initialValues: user,
    onSubmit: registeruser,
    validationSchema: validation,
  });
  return (
    <>
       <Helmet>
          <title>Register</title>

        </Helmet>
   
    <div className="py-5">
      <h1 className="mb-5 text-green-700 text-5xl font-bold text-center">
        Register Form
      </h1>
      <div className="md:w-[60%] mx-auto md:p-0 p-5  ">
        <form onSubmit={formic.handleSubmit}>
          <div className="relative z-0 w-full mb-4 group ">
            <input
              type="text"
              name="name"
              id="name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-700 focus:outline-none focus:ring-0 focus:border-green-700 peer"
              placeholder=" "
              value={formic.values.name}
              onChange={formic.handleChange}
              onBlur={formic.handleBlur}
            />
            <label
              forhtml="name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-700 peer-focus:dark:text-green-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Full Name
            </label>
          </div>
          {formic.errors.name && formic.touched.name ? (
            <div
              className="p-5 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">error</span> {formic.errors.name}
            </div>
          ) : (
            ""
          )}

          <div className="relative z-0 w-full mb-7 group ">
            <input
              type="tel"
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
              Your Phone
            </label>
          </div>
          {formic.errors.phone && formic.touched.phone ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">error</span> {formic.errors.phone}
            </div>
          ) : (
            ""
          )}

          <div className="relative z-0 w-full mb-7 group ">
            <input
              type="email"
              name="email"
              id="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-700 focus:outline-none focus:ring-0 focus:border-green-700 peer"
              placeholder=" "
              value={formic.values.email}
              onChange={formic.handleChange}
              onBlur={formic.handleBlur}
            />
            <label
              forhtml="email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-700 peer-focus:dark:text-green-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email
            </label>
          </div>
          {formic.errors.email && formic.touched.email ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">error</span> {formic.errors.email}
            </div>
          ) : (
            ""
          )}
          <div className="relative z-0 w-full mb-7 group ">
            <input
              type="password"
              name="password"
              id="password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-700 focus:outline-none focus:ring-0 focus:border-green-700 peer"
              placeholder=" "
              value={formic.values.password}
              onChange={formic.handleChange}
              onBlur={formic.handleBlur}
            />
            <label
              forhtml="password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-700 peer-focus:dark:text-green-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>
          </div>
          {formic.errors.password && formic.touched.password ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">error</span>{" "}
              {formic.errors.password}
            </div>
          ) : (
            ""
          )}
          <div className="relative z-0 w-full mb-7 group ">
            <input
              type="password"
              name="rePassword"
              id="rePassword"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-700 focus:outline-none focus:ring-0 focus:border-green-700 peer"
              placeholder=" "
              value={formic.values.rePassword}
              onChange={formic.handleChange}
              onBlur={formic.handleBlur}
            />
            <label
              forhtml="rePassword"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-700 peer-focus:dark:text-green-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              rePassword
            </label>
          </div>
          {formic.errors.rePassword && formic.touched.rePassword ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">error</span>{" "}
              {formic.errors.rePassword}
            </div>
          ) : (
            ""
          )}
          <button
            type="submit"
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
          >
            {isLoading == true ? (
              <i className="fa-solid fa-spinner fa-spin-pulse"></i>
            ) : (
              "Regestration"
            )}
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default Register;

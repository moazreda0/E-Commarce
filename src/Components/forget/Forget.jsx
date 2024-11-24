import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { authContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const Forget = () => {
  const navigate = useNavigate(); // استخدام useNavigate

  const user = {
    email: "",
  };
  const [isLoading, SetisLoading] = useState(false);

  const validation = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address")
      .min(3, "Email must be at least 3 characters")
      .max(50, "Email must be at most 50 characters"),
  });

  async function forget(Values) {
    SetisLoading(true);
    try {
      const res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        Values
      );

      toast.success(res.data.message);

      if (res.data.statusMsg === "success") {
        navigate('/resetPaassword'); // استخدام navigate بدلاً من Navigate
      }

     

    } catch (err) {
      toast.error(err.response?.data?.message || "An error occurred", {
        position: "top-center",
      });
    } finally {
      SetisLoading(false);
    }
  }

  const formik = useFormik({
    initialValues: user,
    onSubmit: forget,
    validationSchema: validation,
  });

  return (
    <div className="py-5">
      <h1 className="mb-5 text-green-700 text-5xl font-bold text-center">
        Forget
      </h1>
      <div className="md:w-[60%] mx-auto md:p-0 p-5">
        <form onSubmit={formik.handleSubmit}>
          <div className="relative z-0 w-full mb-7 group">
            <input
              type="email"
              name="email"
              id="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-700 focus:outline-none focus:ring-0 focus:border-green-700 peer"
              placeholder=" "
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-700 peer-focus:dark:text-green-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email
            </label>
          </div>
          {formik.errors.email && formik.touched.email && (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">Error: </span>
              {formik.errors.email}
            </div>
          )}

          <button
            type="submit"
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
          >
            {isLoading ? (
              <i className="fa-solid fa-spinner fa-spin-pulse"></i>
            ) : (
              "Forget"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Forget;

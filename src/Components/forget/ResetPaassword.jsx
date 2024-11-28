import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { authContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const validation = Yup.object().shape({
    resetCode: Yup.string().required("Reset Code is required")
    .length(6, "Reset Code must be exactly 6 digits"),
    
  });

  async function handleResetPassword(values) {
    setIsLoading(true);
    try {
      const res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        values
      );
      console.log(res);
      

      if (res.data.status === "Success") {
        toast.success(res.data.message);
        navigate("/newPassword"); 
      } else {
        toast.error("Failed to reset password");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  }

  const formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    onSubmit: handleResetPassword,
    validationSchema: validation,
  });

  return (
    <div className="py-5 ">
      <h1 className="mb-5 text-green-700 text-5xl font-bold text-center">
        Reset Password
      </h1>
      <div className="md:w-[60%] mx-auto md:p-0 p-5">
        <form onSubmit={formik.handleSubmit}>
          {/* Reset Code Input */}
          <div className="relative z-0 w-full mb-7 group">
            <input
              type="text"
              name="resetCode"
              id="resetCode"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-700 focus:outline-none focus:ring-0 focus:border-green-700 peer"
              placeholder=" "
              value={formik.values.resetCode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label
              htmlFor="resetCode"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:text-green-700"
            >
              Reset Code
            </label>
          </div>
          {formik.errors.resetCode && formik.touched.resetCode && (
            <div className="p-4 mb-4 text-sm text-red-800 bg-red-50 rounded-lg">
              {formik.errors.resetCode}
            </div>
          )}


          <button
            type="submit"
            className="w-full text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5"
            disabled={isLoading}
          >
            {isLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;

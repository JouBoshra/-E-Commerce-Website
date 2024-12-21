import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import * as Yup from "yup";

export default function SignUpFirst() {
  let validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "min letters is three")
      .max(10, "max letters is ten")
      .required("the name is required"),
    email: Yup.string()
      .email("email is invalid")
      .required("the email is required"),
    phone: Yup.string()
      .matches(
        /^(?:\+20|0)?1[0125]\d{8}$/,
        "phone number must be a valid Egyptian number"
      )
      .required("phone number is required"),
    password: Yup.string()
      .matches(
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
        "password must have @#$%^&* and numbers and capital letters"
      )
      .required("the password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "password and rePassword must be the same")
      .required("the rePassword is required"),
  });

  let navigate = useNavigate();
  const [errorState, setErrorState] = useState("");
  const [loading, isLoading] = useState(false);

  async function handleRegister(values) {
    isLoading(true);
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .then(() => {
        isLoading(false);
        navigate("/Login");
      })
      .catch((apiResponse) => {
        isLoading(false);
        setErrorState(apiResponse?.response?.data?.message);
      });
  }

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: handleRegister,
  });

  useEffect(() => {}, []);

  return (
    <div className="signUpForm mx-auto m-10 p-8">
      <h2 className="m-5">Register Now</h2>
      <div className="mx-auto flex flex-col justify-center items-center gap-6">
        <form
          onSubmit={formik.handleSubmit}
          className="p-4 mx-auto w-full justify-center max-w-xl flex flex-col items-center text-center"
        >
          <div className="m-2 relative w-10/12">
            <input
              type="text"
              id="floating_name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 peer focus:border-[#4fa74d] dark:text-white dark:border-gray-600 dark:focus:border-[#4fa74d]"
              placeholder=" "
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              onBlur={formik.handleBlur}
            />
            <label
              htmlFor="floating_name"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] left-0 peer-focus:left-0 peer-focus:text-[#4fa74d] peer-focus:dark:text-[#4fa74d] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Name:
            </label>
          </div>
          {formik.errors.name && formik.touched.name ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formik.errors.name}
            </div>
          ) : null}
          <div className="m-2 relative w-10/12">
            <input
              type="text"
              id="floating_email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 peer focus:border-[#4fa74d] dark:text-white dark:border-gray-600 dark:focus:border-[#4fa74d]"
              placeholder=" "
              onChange={formik.handleChange}
              value={formik.values.email}
              onBlur={formik.handleBlur}
              name="email"
            />
            <label
              htmlFor="floating_email"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] left-0 peer-focus:left-0 peer-focus:text-[#4fa74d] peer-focus:dark:text-[#4fa74d] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email:
            </label>
          </div>
          {formik.errors.email && formik.touched.email ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formik.errors.email}
            </div>
          ) : null}
          <div className="m-2 relative w-10/12">
            <input
              type="password"
              id="floating_password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 peer focus:border-[#4fa74d] dark:text-white dark:border-gray-600 dark:focus:border-[#4fa74d]"
              placeholder=" "
              onChange={formik.handleChange}
              value={formik.values.password}
              onBlur={formik.handleBlur}
              name="password"
            />
            <label
              htmlFor="floating_password"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] left-0 peer-focus:left-0 peer-focus:text-[#4fa74d] peer-focus:dark:text-[#4fa74d] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password:
            </label>
          </div>
          {formik.errors.password && formik.touched.password ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formik.errors.password}
            </div>
          ) : null}
          <div className="m-2 relative w-10/12">
            <input
              type="password"
              id="floating_repassword"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 peer focus:border-[#4fa74d] dark:text-white dark:border-gray-600 dark:focus:border-[#4fa74d]"
              placeholder=" "
              onChange={formik.handleChange}
              value={formik.values.rePassword}
              onBlur={formik.handleBlur}
              name="rePassword"
            />
            <label
              htmlFor="floating_repassword"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] left-0 peer-focus:left-0 peer-focus:text-[#4fa74d] peer-focus:dark:text-[#4fa74d] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Re-enter Password:
            </label>
          </div>
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formik.errors.rePassword}
            </div>
          ) : null}
          <div className="m-2 relative w-10/12">
            <input
              type="number"
              id="floating_phone"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 peer focus:border-[#4fa74d] dark:text-white dark:border-gray-600 dark:focus:border-[#4fa74d]"
              placeholder=" "
              onChange={formik.handleChange}
              value={formik.values.phone}
              onBlur={formik.handleBlur}
              name="phone"
            />
            <label
              htmlFor="floating_phone"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] left-0 peer-focus:left-0 peer-focus:text-[#4fa74d] peer-focus:dark:text-[#4fa74d] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Phone:
            </label>
          </div>
          {formik.errors.phone && formik.touched.phone ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formik.errors.phone}
            </div>
          ) : null}
          <p
            id="helper-text-explanation"
            className="mt-2 text-sm text-gray-500 dark:text-gray-400"
          >
            If you have an account please
            <Link
              to="/Login"
              className="p-1 font-medium text-blue-600 hover:underline dark:text-blue-500"
            >
              Login Now
            </Link>
            .
          </p>
          <button
            type="submit"
            className={`my-2 p-3 hover:text-white hover:ease-in-out relative inline-flex items-center justify-center mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 bg-[#4fa74d] rounded-lg group focus:ring-2 focus:outline-none focus:ring-[#4fa74d] transition-transform transform ${
              loading ? "scale-105" : ""
            }`}
            disabled={loading}
          >
            {loading ? (
              <svg
                aria-hidden="true"
                role="status"
                className="inline w-6 h-6  text-gray-200 animate-spin dark:text-gray-600 fill-[#4fa74d]"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* SVG paths */}
              </svg>
            ) : (
              "Register"
            )}
          </button>
          {errorState && (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {errorState}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

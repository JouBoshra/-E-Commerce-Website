import "./Login.css";
import axios from "axios";
import { useFormik } from "formik";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

export default function Login() {
  let validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("email is invalid")
      .required("the email is required"),
    password: Yup.string()
      .matches(
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
        "password must have @#$%^&* and numbers and capital letters"
      )
      .required("the password is required"),
  });
  const { setToken } = useContext(AuthContext);

  let navigate = useNavigate();
  const [errorState, setErrorState] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(values) {
    setLoading(true);
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .then((response) => {
        setLoading(false);
        if (response.data.token) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          navigate("/");
        } else {
          setErrorState(
            "Login failed. Please check your credentials and try again."
          );
        }
      })
      .catch((apiResponse) => {
        setLoading(false);
        setErrorState(apiResponse?.response?.data?.message);
      });
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleLogin,
  });

  return (
    <div className="signUpForm mx-auto m-10 p-8">
      <h2 className="m-5">Login Now</h2>
      <div className="mx-auto flex flex-col justify-center items-center gap-6">
        <form
          onSubmit={formik.handleSubmit}
          className="p-4 mx-auto w-full justify-center max-w-xl flex flex-col items-center text-center"
        >
          <div className="m-2 relative w-10/12">
            <input
              type="text"
              id="floating_email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 peer focus:border-[#4fa74d]"
              placeholder=" "
              onChange={formik.handleChange}
              value={formik.values.email}
              onBlur={formik.handleBlur}
              name="email"
            />
            <label
              htmlFor="floating_email"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] left-0 peer-focus:left-0 peer-focus:text-[#4fa74d]"
            >
              Email:
            </label>
          </div>
          {formik.errors.email && formik.touched.email && (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50">
              {formik.errors.email}
            </div>
          )}
          <div className="m-2 relative w-10/12">
            <input
              type="password"
              id="floating_password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 peer focus:border-[#4fa74d]"
              placeholder=" "
              onChange={formik.handleChange}
              value={formik.values.password}
              onBlur={formik.handleBlur}
              name="password"
            />
            <label
              htmlFor="floating_password"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] left-0 peer-focus:left-0 peer-focus:text-[#4fa74d]"
            >
              Password:
            </label>
          </div>
          {formik.errors.password && formik.touched.password && (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50">
              {formik.errors.password}
            </div>
          )}
          <p className="mt-2 text-sm text-gray-500">
            Don't have an account yet?{" "}
            <Link
              to={"/SignUpFirst"}
              className="p-1 font-medium text-blue-600 hover:underline"
            >
              Register Now
            </Link>
          </p>

          <button
            type="submit"
            className="my-2 p-3 bg-[#4fa74d] text-white rounded-lg"
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </button>
          {errorState && (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50">
              {errorState}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

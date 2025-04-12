import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [requestResponse, setRequestResponse] = useState({
    message: "",
    alertClassname: ""
  });

  const navigate = useNavigate();

  const initialValues = {
    username: '',
    password: ''
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required")
  });

  const onSubmit = async (values) => {
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8080";

    try {
      const response = await axios.post(`${BACKEND_URL}/api/auth/login`, values);
      localStorage.setItem("curewell-token", response.data.token);

      setRequestResponse({
        message: "Login successful! Redirecting...",
        alertClassname: "bg-green-100 border-l-4 border-green-500 text-green-700 p-3 mb-4 rounded"
      });

      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (error) {
      setRequestResponse({
        message: error.response?.data?.message || "Login failed.",
        alertClassname: "bg-red-100 border-l-4 border-red-500 text-red-700 p-3 mb-4 rounded"
      });
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    validateOnMount: true
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-xl shadow-md p-8">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">Login to CureWell</h1>

        {requestResponse.message && (
          <div className={requestResponse.alertClassname}>
            {requestResponse.message}
          </div>
        )}

        <form onSubmit={formik.handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {formik.touched.username && formik.errors.username && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.username}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-600 font-semibold hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../Components/Navbar/index";
import apiClient from "../../../Client/ApiCLient";

const AddComponent = () => {
  const [requestResponse, SetRequestResponse] = useState({
    message: "",
    alertClassname: "",
  });

  const navigate = useNavigate();

  const initialValues = {
    name: "",
  };

  const onSubmit = async (values) => {
    apiClient
      .post("/doctor", values)
      .then(
        (response) => {
          SetRequestResponse({
            message: "Doctor Added Successfully",
            alertClassname:
              "bg-green-100 border-l-4 border-green-500 text-green-700 px-6 py-3 rounded shadow-md mb-6 text-center",
          });

          setTimeout(() => {
            navigate("/doctor");
          }, 1000);
        },
        (error) => {
          SetRequestResponse({
            message: error.response?.data?.message || "Something went wrong",
            alertClassname:
              "bg-red-100 border-l-4 border-red-500 text-red-700 px-6 py-3 rounded shadow-md mb-6 text-center",
          });
        }
      )
      .catch((error) => console.log(error));
  };

  useEffect(() => {}, [requestResponse]);

  const validationSchema = Yup.object({
    name: Yup.string().required("Doctor name is required"),
  });

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
  });

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-200 flex flex-col justify-center items-center px-4 py-8">
        {requestResponse.message && (
          <div className={requestResponse.alertClassname} role="alert">
            <p className="font-medium">{requestResponse.message}</p>
          </div>
        )}

        <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-8">
          <h1 className="text-2xl font-bold text-center text-blue-700 mb-6">Add Doctor</h1>

          <form onSubmit={formik.handleSubmit} className="space-y-5">
            {/* Doctor Name */}
            <div>
              <label className="block font-medium text-gray-700 mb-1">Doctor Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter doctor's name"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-sm text-red-600 mt-1">{formik.errors.name}</p>
              )}
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
              >
                Add Doctor
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddComponent;

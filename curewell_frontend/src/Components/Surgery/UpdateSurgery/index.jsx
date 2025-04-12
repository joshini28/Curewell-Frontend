import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import apiClient from "../../../Client/ApiCLient";
import * as Yup from "yup";
import Navbar from "../../Navbar";
import { useFormik } from "formik";

const Updatesurgery = () => {
  const location = useLocation();
  const surgery = location.state.surgery;

  const [requestResponse, SetRequestResponse] = useState({
    message: "",
    alertClassname: "",
  });

  const navigate = useNavigate();

  const initialValues = {
    startTime: surgery.startTime,
    endTime: surgery.endTime,
  };

  const validationSchema = Yup.object({
    startTime: Yup.string().required("Start time is required"),
    endTime: Yup.string().required("End time is required"),
  });

  const onSubmit = async (values) => {
    apiClient
      .put(`/surgery/${surgery.id}`, values)
      .then(
        (response) => {
          SetRequestResponse({
            message: "Surgery updated successfully!",
            alertClassname:
              "bg-green-100 border-l-4 border-green-500 text-green-700 px-6 py-3 rounded shadow-md mb-4 text-center",
          });

          setTimeout(() => {
            navigate("/surgery");
          }, 1000);
        },
        (error) => {
          SetRequestResponse({
            message: "Error updating surgery. Please try again.",
            alertClassname:
              "bg-red-100 border-l-4 border-red-500 text-red-700 px-6 py-3 rounded shadow-md mb-4 text-center",
          });
        }
      )
      .catch((error) => console.log(error));
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    validateOnMount: true,
  });

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center py-10 px-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
          {requestResponse.message && (
            <div className={requestResponse.alertClassname}>
              <p className="font-medium">{requestResponse.message}</p>
            </div>
          )}

          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Update Surgery
          </h2>

          <form onSubmit={formik.handleSubmit} className="space-y-5">
            {/* Start Time */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Start Time</label>
              <input
                type="time"
                name="startTime"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formik.values.startTime}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.startTime && formik.errors.startTime && (
                <p className="text-sm text-red-600 mt-1">{formik.errors.startTime}</p>
              )}
            </div>

            {/* End Time */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">End Time</label>
              <input
                type="time"
                name="endTime"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formik.values.endTime}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.endTime && formik.errors.endTime && (
                <p className="text-sm text-red-600 mt-1">{formik.errors.endTime}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
            >
              Update Surgery
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Updatesurgery;

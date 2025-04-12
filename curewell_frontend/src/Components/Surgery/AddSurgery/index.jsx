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
    surgerydate: "",
    starttime: "",
    endtime: "",
    doctorId: "",
    surgeryCode: "",
  };

  const validationSchema = Yup.object({
    surgerydate: Yup.string().required("Date is required"),
    starttime: Yup.string().required("Start Time is required"),
    endtime: Yup.string().required("End Time is required"),
    doctorId: Yup.string().required("Doctor ID is required"),
    surgeryCode: Yup.string().required("Surgery Code is required"),
  });

  const onSubmit = async (values) => {
    apiClient
      .post("/surgery", values)
      .then(() => {
        SetRequestResponse({
          message: "Surgery Added Successfully",
          alertClassname:
            "bg-green-100 border-l-4 border-green-500 text-green-700 px-6 py-3 rounded shadow-md mb-6 text-center",
        });

        setTimeout(() => {
          navigate("/surgery");
        }, 1000);
      })
      .catch((error) => {
        SetRequestResponse({
          message: error.response?.data?.message || "Error occurred",
          alertClassname:
            "bg-red-100 border-l-4 border-red-500 text-red-700 px-6 py-3 rounded shadow-md mb-6 text-center",
        });
      });
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
  });

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-tr from-blue-100 to-blue-200 flex items-center justify-center py-10 px-4">
        <div className="bg-white shadow-xl rounded-xl w-full max-w-xl p-8">
          {requestResponse.message && (
            <div className={requestResponse.alertClassname} role="alert">
              <p className="font-medium">{requestResponse.message}</p>
            </div>
          )}

          <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">Add Surgery</h2>

          <form onSubmit={formik.handleSubmit} className="space-y-6">
            {/* Surgery Date */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Surgery Date</label>
              <input
                type="date"
                name="surgerydate"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                value={formik.values.surgerydate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.surgerydate && formik.errors.surgerydate && (
                <p className="text-sm text-red-600 mt-1">{formik.errors.surgerydate}</p>
              )}
            </div>

            {/* Surgery Code */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Surgery Code</label>
              <input
                type="text"
                name="surgeryCode"
                placeholder="Enter surgery code"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                value={formik.values.surgeryCode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.surgeryCode && formik.errors.surgeryCode && (
                <p className="text-sm text-red-600 mt-1">{formik.errors.surgeryCode}</p>
              )}
            </div>

            {/* Doctor ID */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Doctor ID</label>
              <input
                type="text"
                name="doctorId"
                placeholder="Enter doctor ID"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                value={formik.values.doctorId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.doctorId && formik.errors.doctorId && (
                <p className="text-sm text-red-600 mt-1">{formik.errors.doctorId}</p>
              )}
            </div>

            {/* Start Time */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Start Time</label>
              <input
                type="time"
                name="starttime"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                value={formik.values.starttime}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.starttime && formik.errors.starttime && (
                <p className="text-sm text-red-600 mt-1">{formik.errors.starttime}</p>
              )}
            </div>

            {/* End Time */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">End Time</label>
              <input
                type="time"
                name="endtime"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                value={formik.values.endtime}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.endtime && formik.errors.endtime && (
                <p className="text-sm text-red-600 mt-1">{formik.errors.endtime}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
              >
                Add Surgery
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddComponent;

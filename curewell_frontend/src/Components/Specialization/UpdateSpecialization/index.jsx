import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import apiClient from '../../../Client/ApiCLient';
import * as Yup from 'yup';
import { useFormik } from 'formik';

const UpdateSpecialization = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const specialization = location.state?.specialization;

  const [requestResponse, SetRequestResponse] = useState({
    message: "",
    alertClassname: ""
  });

  useEffect(() => {
    if (!specialization) {
      navigate("/specialization");
    }
  }, [specialization, navigate]);

  const initialValues = {
    code: specialization?.code || "",
    name: specialization?.name || "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Specialization name is required"),
  });

  const onSubmit = async (values) => {
    apiClient.put(`/specialization/${specialization.code}`, values)
      .then(
        (response) => {
          SetRequestResponse({
            message: "Specialization updated successfully",
            alertClassname: "bg-green-100 border-l-4 border-green-500 text-green-700 px-6 py-3 rounded shadow-md mb-6 text-center",
          });
          setTimeout(() => {
            navigate("/specialization");
          }, 1000);
        },
        (error) => {
          SetRequestResponse({
            message: "Update failed. Please try again.",
            alertClassname: "bg-red-100 border-l-4 border-red-500 text-red-700 px-6 py-3 rounded shadow-md mb-6 text-center",
          });
        }
      ).catch((error) => console.log(error));
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    enableReinitialize: true,
    validateOnMount: true,
  });

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 to-indigo-200 flex flex-col justify-center items-center px-4 py-8">
      {requestResponse.message && (
        <div className={requestResponse.alertClassname} role="alert">
          <p className="font-medium">{requestResponse.message}</p>
        </div>
      )}

      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center text-indigo-700 mb-6">Update Specialization</h1>

        <form onSubmit={formik.handleSubmit} className="space-y-5">
          {/* Code (Read-only) */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">Specialization Code</label>
            <input
              type="text"
              name="code"
              readOnly
              className="w-full border border-gray-300 bg-gray-100 text-gray-700 rounded-md px-4 py-2 cursor-not-allowed"
              value={formik.values.code}
            />
          </div>

          {/* Name (Editable) */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">Specialization Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter specialization name"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
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
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
            >
              Update Specialization
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateSpecialization;

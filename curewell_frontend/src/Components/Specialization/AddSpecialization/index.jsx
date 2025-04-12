import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../Components/Navbar';
import apiClient from '../../../Client/ApiCLient';

const AddComponent = () => {
  const [requestResponse, setRequestResponse] = useState({
    message: '',
    alertClassname: '',
  });

  const navigate = useNavigate();

  const initialValues = {
    code: '',
    name: '',
  };

  const onSubmit = async (values) => {
    apiClient
      .post('/specialization', values)
      .then(
        (response) => {
          setRequestResponse({
            message: 'Specialization Added Successfully',
            alertClassname:
              'bg-green-100 border-l-4 border-green-500 text-green-700 px-6 py-3 rounded shadow-md mb-6 text-center',
          });

          setTimeout(() => {
            navigate('/specialization');
          }, 1000);
        },
        (error) => {
          console.log(error);
          setRequestResponse({
            message: error.response.data.message,
            alertClassname:
              'bg-red-100 border-l-4 border-red-500 text-red-700 px-6 py-3 rounded shadow-md mb-6 text-center',
          });
        }
      )
      .catch((error) => console.log(error));
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    code: Yup.string().required('Code is required'),
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
      <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-200 flex flex-col justify-center items-center px-4">
        {requestResponse.message && (
          <div className={requestResponse.alertClassname} role="alert">
            <p className="font-medium">{requestResponse.message}</p>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">
          <h1 className="text-2xl font-bold text-center text-blue-700 mb-6">Add Specialization</h1>

          <form onSubmit={formik.handleSubmit} className="space-y-6">
            {/* Code */}
            <div>
              <label htmlFor="code" className="block text-gray-700 font-medium mb-1">
                Code
              </label>
              <input
                type="text"
                name="code"
                placeholder="Enter specialization code"
                value={formik.values.code}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {formik.touched.code && formik.errors.code && (
                <p className="text-sm text-red-600 mt-1">{formik.errors.code}</p>
              )}
            </div>

            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter specialization name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-sm text-red-600 mt-1">{formik.errors.name}</p>
              )}
            </div>

            {/* Submit */}
            <div className="text-center">
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
              >
                Add Specialization
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddComponent;

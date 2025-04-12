import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import Navbar from "../../../Components/Navbar/index";
import apiClient from '../../../Client/ApiCLient';

const AddComponent = () => {
  const [requestResponse, setRequestResponse] = useState({
    message: '',
    alertClassname: '',
  });

  const navigate = useNavigate();

  const initialValues = {
    doctorId: '',
    specializationCode: '',
  };

  const validationSchema = Yup.object({
    doctorId: Yup.string().required('Doctor ID is required'),
    specializationCode: Yup.string().required('Specialization code is required'),
  });

  const onSubmit = async (values) => {
    apiClient
      .post('/doctorSpecialization', values)
      .then((response) => {
        setRequestResponse({
          message: 'Doctor specialization added successfully',
          alertClassname:
            'bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4',
        });

        setTimeout(() => {
          navigate('/doctorSpecialization');
        }, 1000);
      })
      .catch((error) => {
        setRequestResponse({
          message: error.response?.data?.message || 'Something went wrong!',
          alertClassname:
            'bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4',
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
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex justify-center items-center h-full py-10">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
          {requestResponse.message && (
            <div className={requestResponse.alertClassname} role="alert">
              {requestResponse.message}
            </div>
          )}

          <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">
            Add Doctor Specialization
          </h2>

          <form onSubmit={formik.handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="doctorId" className="block text-gray-700 font-medium">
                Doctor ID
              </label>
              <input
                type="text"
                name="doctorId"
                id="doctorId"
                placeholder="Enter Doctor ID"
                value={formik.values.doctorId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  formik.touched.doctorId && formik.errors.doctorId
                    ? 'border-red-500'
                    : 'border-gray-300'
                }`}
              />
              {formik.touched.doctorId && formik.errors.doctorId && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.doctorId}</p>
              )}
            </div>

            <div>
              <label htmlFor="specializationCode" className="block text-gray-700 font-medium">
                Specialization Code
              </label>
              <input
                type="text"
                name="specializationCode"
                id="specializationCode"
                placeholder="Enter Specialization Code"
                value={formik.values.specializationCode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  formik.touched.specializationCode && formik.errors.specializationCode
                    ? 'border-red-500'
                    : 'border-gray-300'
                }`}
              />
              {formik.touched.specializationCode && formik.errors.specializationCode && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.specializationCode}</p>
              )}
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
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

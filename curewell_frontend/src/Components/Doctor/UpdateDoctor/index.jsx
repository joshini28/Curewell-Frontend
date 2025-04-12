import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import apiClient from '../../../Client/ApiCLient';
import * as Yup from 'yup';
import { useFormik } from 'formik';

const UpdateDoctor = () => {
  const location = useLocation();
  const doctor = location.state?.doctor;

  const [requestResponse, setRequestResponse] = useState({
    message: '',
    alertClassname: '',
  });

  const navigate = useNavigate();

  const initialValues = {
    name: doctor?.name || '',
  };

  const onSubmit = async (values) => {
    apiClient
      .put(`/doctor/${doctor.id}`, values)
      .then(
        (response) => {
          setRequestResponse({
            message: 'Doctor updated successfully',
            alertClassname:
              'bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded mb-4',
          });

          setTimeout(() => {
            navigate('/doctor');
          }, 1000);
        },
        (error) => {
          console.log(error);
          setRequestResponse({
            message: 'Failed to update doctor',
            alertClassname:
              'bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded mb-4',
          });
        }
      )
      .catch((error) => console.log(error));
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
  });

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
    enableReinitialize: true,
  });

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-300 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-lg p-8">
        {requestResponse.message && (
          <div className={requestResponse.alertClassname} role="alert">
            <p>{requestResponse.message}</p>
          </div>
        )}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Update Doctor
        </h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter doctor's name"
              className={`w-full px-3 py-2 border ${
                formik.touched.name && formik.errors.name
                  ? 'border-red-500'
                  : 'border-gray-300'
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400`}
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
            disabled={!formik.isValid}
          >
            Update Doctor
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateDoctor;

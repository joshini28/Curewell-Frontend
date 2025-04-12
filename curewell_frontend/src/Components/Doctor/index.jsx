import React, { useEffect, useState } from 'react';
import apiClient from '../../Client/ApiCLient';
import { Link, useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    apiClient
      .get('/doctor')
      .then((response) => {
        setDoctors(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const deleteDoctor = async (id) => {
    apiClient
      .delete(`/doctor/${id}`)
      .then(() => {
        setRefresh(true);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (refresh) {
      window.location.reload();
    }
  }, [refresh]);

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-700">Doctor List</h1>
          <Link
            to="/addDoctor"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Add Doctor
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
            <thead className="bg-blue-100">
              <tr>
                <th className="text-left px-6 py-3 font-semibold text-gray-700">ID</th>
                <th className="text-left px-6 py-3 font-semibold text-gray-700">Name</th>
                <th className="text-left px-6 py-3 font-semibold text-gray-700">Update</th>
                <th className="text-left px-6 py-3 font-semibold text-gray-700">Delete</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doctor, index) => (
                <tr key={index} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4">{doctor.id}</td>
                  <td className="px-6 py-4">{doctor.name}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() =>
                        navigate(`/doctor/${doctor.id}`, {
                          state: { doctor: { id: doctor.id, name: doctor.name } },
                        })
                      }
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-md transition"
                    >
                      Update
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <Popup
                      trigger={
                        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition">
                          Delete
                        </button>
                      }
                      modal
                      nested
                    >
                      {(close) => (
                        <div className="bg-white rounded-lg shadow-lg p-6 w-96 mx-auto mt-20 border border-gray-300">
                          <h2 className="text-lg font-semibold mb-4 text-gray-800">
                            Confirm Deletion
                          </h2>
                          <p className="mb-6 text-gray-700">
                            Are you sure you want to delete{' '}
                            <span className="text-red-600 font-medium">{doctor.name}</span> and all
                            their surgeries?
                          </p>
                          <div className="flex justify-end gap-4">
                            <button
                              onClick={close}
                              className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => {
                                deleteDoctor(doctor.id);
                                close();
                              }}
                              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </Popup>
                  </td>
                </tr>
              ))}
              {doctors.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center px-6 py-4 text-gray-500">
                    No doctors found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DoctorList;

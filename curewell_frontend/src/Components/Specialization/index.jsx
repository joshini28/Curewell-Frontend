import React, { useEffect, useState } from 'react';
import apiClient from '../../Client/ApiCLient';
import { Link, useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';

const SpecializationList = () => {
  const [specialization, setSpecialization] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    apiClient.get("/specialization")
      .then((response) => setSpecialization(response.data))
      .catch((error) => console.log(error));
  }, []);

  const deletecontent = async (code) => {
    apiClient.delete(`/specialization/${code}`)
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
    <div className="min-h-screen bg-gray-100 py-10 px-4 flex justify-center">
      <div className="bg-white shadow-md rounded-lg w-full max-w-6xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Doctor Specialization List</h1>
          <Link
            to="/addSpecialization"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Add Specialization
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-md overflow-hidden">
            <thead className="bg-blue-100 text-gray-700">
              <tr>
                <th className="px-4 py-3 text-left">Specialization Code</th>
                <th className="px-4 py-3 text-left">Specialization Name</th>
                <th className="px-4 py-3 text-center">Update</th>
                <th className="px-4 py-3 text-center">Delete</th>
              </tr>
            </thead>
            <tbody>
              {specialization.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-6 text-gray-500">
                    No specializations found.
                  </td>
                </tr>
              ) : (
                specialization.map((item, index) => (
                  <tr key={index} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-3">{item.code}</td>
                    <td className="px-4 py-3">{item.name}</td>
                    <td className="px-4 py-3 text-center">
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                        onClick={() =>
                          navigate(`/specialization/${item.code}`, {
                            state: { specialization: { code: item.code, name: item.name } },
                          })
                        }
                      >
                        Update
                      </button>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Popup
                        trigger={
                          <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                            Delete
                          </button>
                        }
                        modal
                        nested
                      >
                        {(close) => (
                          <div className="bg-white p-6 rounded-lg shadow-md w-96">
                            <h2 className="text-lg font-semibold mb-4">
                              Delete <span className="text-red-600">{item.name}</span> and related surgeries?
                            </h2>
                            <div className="flex justify-end gap-4">
                              <button
                                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                                onClick={close}
                              >
                                Cancel
                              </button>
                              <button
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                onClick={() => {
                                  deletecontent(item.code);
                                  close();
                                }}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        )}
                      </Popup>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SpecializationList;

import React, { useEffect, useState } from 'react';
import apiClient from '../../Client/ApiCLient';
import { Link, useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';

const SurgeryList = () => {
  const [surgery, setSurgery] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    apiClient
      .get("/surgery")
      .then((response) => {
        setSurgery(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const deletecontent = async (id) => {
    apiClient
      .delete(`/surgery/${id}`)
      .then(() => {
        setRefresh(true);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (refresh) window.location.reload();
  }, [refresh]);

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-8">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-md shadow">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Surgery List</h1>
          <Link
            to="/addSurgery"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
          >
            Add Surgery
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-blue-100 text-gray-700">
              <tr>
                <th className="py-3 px-4 font-semibold">Date</th>
                <th className="py-3 px-4 font-semibold">Surgery ID</th>
                <th className="py-3 px-4 font-semibold">Surgery Name</th>
                <th className="py-3 px-4 font-semibold">Doctor ID</th>
                <th className="py-3 px-4 font-semibold">Doctor Name</th>
                <th className="py-3 px-4 font-semibold">Start Time</th>
                <th className="py-3 px-4 font-semibold">End Time</th>
                <th className="py-3 px-4 font-semibold">Update</th>
                <th className="py-3 px-4 font-semibold">Delete</th>
              </tr>
            </thead>

            <tbody className="bg-white">
              {surgery.length === 0 ? (
                <tr>
                  <td colSpan="9" className="text-center text-gray-500 py-6">
                    No surgeries found.
                  </td>
                </tr>
              ) : (
                surgery.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2 px-4">{item.surgeryDate}</td>
                    <td className="py-2 px-4">{item.surgeryId}</td>
                    <td className="py-2 px-4">{item.specialization.name}</td>
                    <td className="py-2 px-4">{item.doctor.id}</td>
                    <td className="py-2 px-4">{item.doctor.name}</td>
                    <td className="py-2 px-4">{item.startTime}</td>
                    <td className="py-2 px-4">{item.endTime}</td>
                    <td className="py-2 px-4">
                      <button
                        className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-md"
                        onClick={() =>
                          navigate(`/addsurgery/${item.surgeryId}`, {
                            state: {
                              surgery: {
                                id: item.surgeryId,
                                startTime: item.startTime,
                                endTime: item.endTime,
                              },
                            },
                          })
                        }
                      >
                        Update
                      </button>
                    </td>
                    <td className="py-2 px-4">
                      <Popup
                        trigger={
                          <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md">
                            Delete
                          </button>
                        }
                        modal
                        nested
                      >
                        {(close) => (
                          <div className="bg-white p-6 rounded-lg shadow-md border w-80 mx-auto">
                            <h2 className="text-lg font-semibold mb-3">
                              Delete Surgery ID{" "}
                              <span className="text-red-600">
                                {item.surgeryId}
                              </span>
                              ?
                            </h2>
                            <div className="flex justify-end gap-4">
                              <button
                                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                                onClick={close}
                              >
                                Cancel
                              </button>
                              <button
                                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                                onClick={() => {
                                  deletecontent(item.surgeryId);
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

export default SurgeryList;

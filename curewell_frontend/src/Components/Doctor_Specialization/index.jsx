import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const DoctorSpecializationList = () => {
  const [doctorSpecializations, setDoctorSpecializations] = useState([]);

  useEffect(() => {
    fetchDoctorSpecializations();
  }, []);

  const fetchDoctorSpecializations = async () => {
    try {
      const response = await axios.get('http://localhost:8080/doctor-specializations');
      setDoctorSpecializations(response.data);
    } catch (error) {
      console.error('Error fetching doctor specializations:', error);
    }
  };

  const handleDelete = async (doctorId, specializationCode) => {
    try {
      await axios.delete(`http://localhost:8080/doctor-specializations/delete/${doctorId}/${specializationCode}`);
      fetchDoctorSpecializations();
    } catch (error) {
      console.error('Error deleting specialization:', error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Doctor Specialization List</h2>
          <Link to="/adddoctorSpecialization">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
              Add Specialization
            </button>
          </Link>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-blue-100 text-gray-800">
              <tr>
                <th className="py-3 px-4 text-left">Doctor ID</th>
                <th className="py-3 px-4 text-left">Specialization Code</th>
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-left">Delete</th>
              </tr>
            </thead>
            <tbody>
              {doctorSpecializations.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-6 text-gray-500">
                    No specializations found.
                  </td>
                </tr>
              ) : (
                doctorSpecializations.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-3 px-4">{item.id.doctorId}</td>
                    <td className="py-3 px-4">{item.id.specializationCode}</td>
                    <td className="py-3 px-4">{item.localDate}</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleDelete(item.id.doctorId, item.id.specializationCode)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
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

export default DoctorSpecializationList;

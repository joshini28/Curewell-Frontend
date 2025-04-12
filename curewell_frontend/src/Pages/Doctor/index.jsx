import React from 'react';
import Navbar from "../../Components/Navbar";
import DoctorList from '../../Components/Doctor';

const Doctor = () => {
  return (
    <div className="min-h-screen w-full bg-gray-100">
      {/* Navbar fixed at top */}
      <Navbar />

      {/* Page content */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">Doctor List</h1>
          <DoctorList />
        </div>
      </div>
    </div>
  );
};

export default Doctor;

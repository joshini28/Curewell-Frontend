import React from 'react';
import Navbar from '../../Components/Navbar';
import SpecializationList from "../../Components/Doctor_Specialization/index";

const Doctorspecialization = () => {
  return (
    <div className="min-h-screen w-full bg-gray-100">
      {/* Fixed top navigation */}
      <Navbar />

      {/* Centered container for content */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">Doctor Specialization List</h1>
          <SpecializationList />
        </div>
      </div>
    </div>
  );
};

export default Doctorspecialization;

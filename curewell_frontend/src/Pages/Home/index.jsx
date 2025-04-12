import React from 'react';
import Navbar from '../../Components/Navbar';
import TodaysSurgery from '../../Components/TodaySurgery';

const Home = () => {
  return (
    <div className="min-h-screen w-full bg-gray-100">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Content Container */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">Today's Surgeries</h1>
          <TodaysSurgery />
        </div>
      </div>
    </div>
  );
};

export default Home;

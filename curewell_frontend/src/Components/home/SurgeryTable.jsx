import React from 'react';

const SurgeryTable = (props) => {
  const surgeries = props.data;
  console.log(surgeries);

  return (
    <div className="bg-gray-100 py-10 px-8 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Surgery List</h2>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-blue-100 text-gray-800">
              <tr>
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-left">Surgery ID</th>
                <th className="py-3 px-4 text-left">Surgery Name</th>
                <th className="py-3 px-4 text-left">Doctor ID</th>
                <th className="py-3 px-4 text-left">Doctor Name</th>
                <th className="py-3 px-4 text-left">Start Time</th>
                <th className="py-3 px-4 text-left">End Time</th>
              </tr>
            </thead>
            <tbody>
              {surgeries.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-6 text-gray-500">
                    No surgeries found.
                  </td>
                </tr>
              ) : (
                surgeries.map((surgery, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-3 px-4">{surgery.surgeryDate}</td>
                    <td className="py-3 px-4">{surgery.surgeryId}</td>
                    <td className="py-3 px-4">{surgery.specialization?.name}</td>
                    <td className="py-3 px-4">{surgery.doctor?.id}</td>
                    <td className="py-3 px-4">{surgery.doctor?.name}</td>
                    <td className="py-3 px-4">{surgery.startTime}</td>
                    <td className="py-3 px-4">{surgery.endTime}</td>
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

export default SurgeryTable;

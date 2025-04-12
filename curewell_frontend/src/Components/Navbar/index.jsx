import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedin, setIsLoggedin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('curewell_token');
    setIsLoggedin(!!token);
  }, []);

  const onLogoutHandler = () => {
    localStorage.removeItem('curewell_token');
    setIsLoggedin(false);
    navigate('/login');
  };

  return (
    <nav className="w-full bg-gradient-to-r from-blue-600 to-blue-400 shadow-lg py-4 px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand */}
        <div className="text-3xl font-bold text-white tracking-wide">
          <Link to="/">Cure<span className="text-yellow-300">Well</span></Link>
        </div>

        {/* Navigation Links */}
        <ul className="flex space-x-6 text-white text-lg font-medium">
          <li>
            <Link to="/doctor" className="hover:text-yellow-300 transition-all duration-200">
              Doctors
            </Link>
          </li>
          <li>
            <Link to="/specialization" className="hover:text-yellow-300 transition-all duration-200">
              Specializations
            </Link>
          </li>
          <li>
            <Link to="/doctorSpecialization" className="hover:text-yellow-300 transition-all duration-200">
              Doctor Specializations
            </Link>
          </li>
          <li>
            <Link to="/surgery" className="hover:text-yellow-300 transition-all duration-200">
              Surgery
            </Link>
          </li>
        </ul>

        {/* Auth Button */}
        <div>
          {!isLoggedin ? (
            <Link
              to="/login"
              className="bg-white text-blue-600 font-semibold px-4 py-2 rounded-full shadow hover:bg-yellow-300 hover:text-white transition-all duration-300"
            >
              Login
            </Link>
          ) : (
            <button
              onClick={onLogoutHandler}
              className="bg-red-500 text-white font-semibold px-4 py-2 rounded-full shadow hover:bg-red-600 transition-all duration-300"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

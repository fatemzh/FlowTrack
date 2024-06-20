import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Implement logout functionality here
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-green-600 text-white backdrop-blur-lg shadow-md p-4 fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-3xl font-bold cursor-pointer" onClick={() => navigate('/')}>FlowTrack</div>
          <nav className="hidden md:flex space-x-4">
            <a href="#features" className="hover:text-gray-100">Features</a>
            <a href="#about" className="hover:text-gray-100">About Us</a>
            <a href="/profile" className="hover:text-gray-100">Profile</a>
            <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white py-1 px-4 rounded transition duration-300">Log Out</button>
          </nav>
          <button
            className="md:hidden text-gray-100 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
            </svg>
          </button>
        </div>
        {menuOpen && (
          <nav className="md:hidden bg-green-600">
            <a href="#features" className="block py-2 px-4 hover:bg-green-700">Features</a>
            <a href="#about" className="block py-2 px-4 hover:bg-green-700">About Us</a>
            <a href="/profile" className="block py-2 px-4 hover:bg-green-700">Profile</a>
            <button onClick={handleLogout} className="block w-full text-left py-2 px-4 hover:bg-red-700">Log Out</button>
          </nav>
        )}
      </header>
      
      <main className="container mx-auto flex-grow flex flex-col justify-center items-center text-center py-20 md:py-32">
        <div className="bg-white/30 backdrop-blur-lg shadow-lg rounded-lg p-10 md:p-20">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">Welcome to FlowTrack</h1>
          <p className="text-lg md:text-2xl text-gray-600 mb-10">Efficiently manage your drivers and schedules with our comprehensive platform.</p>
          <button className="bg-green-600 text-white py-2 px-6 rounded-lg text-lg hover:bg-green-700 transition duration-300">Get Started</button>
        </div>
      </main>

      <section id="features" className="py-16 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/30 backdrop-blur-lg shadow-lg rounded-lg p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Driver Management</h3>
              <p className="text-gray-600">Efficiently manage driver information and their schedules.</p>
            </div>
            <div className="bg-white/30 backdrop-blur-lg shadow-lg rounded-lg p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Group Management</h3>
              <p className="text-gray-600">Organize drivers into groups for better coordination.</p>
            </div>
            <div className="bg-white/30 backdrop-blur-lg shadow-lg rounded-lg p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Scheduling</h3>
              <p className="text-gray-600">Create and manage schedules with ease.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-16 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">About Us</h2>
          <p className="text-lg text-gray-600">FlowTrack is a leading platform for managing drivers and their schedules, making it easier for companies to streamline their operations.</p>
        </div>
      </section>

      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          &copy; 2024 FlowTrack. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default HomePage;

import React from 'react';

const ProfilePage: React.FC = () => {
  const user = {
    firstname: "John",
    lastname: "Doe",
    email: "john.doe@example.com",
    phone_number: "+41 79 123 45 67",
    profession: "Driver"
  }; // This should be fetched from the user's actual data

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-green-600 text-white backdrop-blur-lg shadow-md p-4 fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-3xl font-bold">FlowTrack</div>
          <nav className="hidden md:flex space-x-4">
            <a href="/" className="hover:text-gray-100">Home</a>
            <a href="/profile" className="hover:text-gray-100">Profile</a>
            <button onClick={() => { localStorage.removeItem('token'); navigate('/login'); }} className="bg-red-600 hover:bg-red-700 text-white py-1 px-4 rounded transition duration-300">Log Out</button>
          </nav>
        </div>
      </header>
      
      <main className="container mx-auto flex-grow flex flex-col justify-center items-center text-center py-20 md:py-32">
        <div className="bg-white/30 backdrop-blur-lg shadow-lg rounded-lg p-10 md:p-20">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">Profile</h1>
          <p className="text-lg md:text-2xl text-gray-600 mb-10">{user.firstname} {user.lastname}</p>
          <p className="text-lg md:text-2xl text-gray-600 mb-10">{user.email}</p>
          <p className="text-lg md:text-2xl text-gray-600 mb-10">{user.phone_number}</p>
          <p className="text-lg md:text-2xl text-gray-600 mb-10">{user.profession}</p>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          &copy; 2024 FlowTrack. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default ProfilePage;

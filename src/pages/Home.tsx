import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <NavBar />
      <main className="container mx-auto flex-grow flex flex-col justify-center items-center text-center py-20 md:py-32">
        <div className="bg-white/30 backdrop-blur-lg shadow-lg rounded-lg p-10 md:p-20">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            Welcome to FlowTrack
          </h1>
          <p className="text-lg md:text-2xl text-gray-600 mb-10">
            Efficiently manage your drivers and schedules with our comprehensive
            platform.
          </p>
          <button className="bg-green-600 text-white py-2 px-6 rounded-lg text-lg hover:bg-green-700 transition duration-300">
            Get Started
          </button>
        </div>
      </main>

      <section id="features" className="py-16 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/30 backdrop-blur-lg shadow-lg rounded-lg p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Driver Management
              </h3>
              <p className="text-gray-600">
                Efficiently manage driver information and their schedules.
              </p>
            </div>
            <div className="bg-white/30 backdrop-blur-lg shadow-lg rounded-lg p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Group Management
              </h3>
              <p className="text-gray-600">
                Organize drivers into groups for better coordination.
              </p>
            </div>
            <div className="bg-white/30 backdrop-blur-lg shadow-lg rounded-lg p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Scheduling
              </h3>
              <p className="text-gray-600">
                Create and manage schedules with ease.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-16 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">About Us</h2>
          <p className="text-lg text-gray-600">
            FlowTrack is a leading platform for managing drivers and their
            schedules, making it easier for companies to streamline their
            operations.
          </p>
        </div>
      </section>

      <Footer/>
    </div>
  );
};

export default HomePage;

import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
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
            Write us
          </button>
        </div>
      </main>
      <Footer/>
    </div>
  );
};

export default HomePage;

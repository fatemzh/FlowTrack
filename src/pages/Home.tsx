import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import heroImage from "../assets/hero.png";

const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto min-h-screen flex flex-col">
      <NavBar />
      <main className="flex flex-grow justify-center items-center text-center md:py-32">
        <div className="flex flex-row items-center">
          <div className="w-[500px] h-[500px] flex flex-col justify-evenly text-left">
            <h1 className="text-5xl font-bold text-gray-800">
              Simplify Volunteer Management for Effective Assistance
            </h1>
            <p className="text-lg text-gray-600 mb-10">
              An all-in-one solution to organize volunteers and improve the lives of disabled individuals
            </p>
            <div className="flex flex-row">
              <a className="w-auto m-1 cursor-pointer bg-teal-600 text-white py-2 px-6 rounded-lg text-lg hover:bg-teal-800 transition duration-300">
                Discover Our Solution
              </a>
              <a className="m-1 bg-indigo-600 cursor-pointer text-white py-2 px-6 rounded-lg text-lg hover:bg-indigo-300 transition duration-300">
                Contact Us
              </a>              
            </div>
          </div>
          <div >
            <img
              src={heroImage}
              alt="Stock image of a young women in a wheelchair talking with another woman next to her"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      </main>
      <section id="features" className="py-16">
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

      <section id="about" className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">About Us</h2>
          <p className="text-lg text-gray-600">
            FlowTrack is a leading platform for managing drivers and their
            schedules, making it easier for companies to streamline their
            operations.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;

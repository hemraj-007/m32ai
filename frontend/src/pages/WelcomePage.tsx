import { Link } from 'react-router-dom';

const WelcomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 flex flex-col items-center justify-center text-center relative overflow-hidden px-6">

      {/* Wavy Animated Background */}
      <div className="absolute inset-0">
        <svg
          viewBox="0 0 1440 320"
          className="w-full h-full animate-pulse"
          preserveAspectRatio="none"
        >
          <path
            fill="#7c3aed"
            fillOpacity="0.2"
            d="M0,192L80,170.7C160,149,320,107,480,112C640,117,800,171,960,170.7C1120,171,1280,117,1360,90.7L1440,64V320H1360C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320H0Z"
          ></path>
        </svg>
      </div>

      {/* Actual Content */}
      <div className="relative z-10 flex flex-col items-center justify-center space-y-8">

        {/* Heading */}
        <h1 className="text-5xl sm:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 animate-fade-in">
          Welcome to M32 AI 🚀
        </h1>

        {/* Subtext */}
        <p className="text-gray-300 text-lg sm:text-xl max-w-2xl">
          Create powerful rubrics, assignments, and feedback in seconds. Organize, track, and manage your educational workflow with ease!
        </p>

        {/* Navigation Buttons */}
        <div className="flex flex-wrap justify-center gap-6 mt-6">
          <Link
            to="/dashboard"
            className="px-6 py-3 rounded-full text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 transition text-lg font-semibold shadow-md"
          >
            🚀 Dashboard
          </Link>
          <Link
            to="/history"
            className="px-6 py-3 rounded-full text-purple-300 border border-purple-500 hover:bg-purple-600 hover:text-white transition text-lg font-semibold shadow-md"
          >
            📜 History
          </Link>
          <Link
            to="/courses"
            className="px-6 py-3 rounded-full text-pink-300 border border-pink-500 hover:bg-pink-600 hover:text-white transition text-lg font-semibold shadow-md"
          >
            📚 Courses
          </Link>
        </div>

      </div>
    </div>
  );
};

export default WelcomePage;

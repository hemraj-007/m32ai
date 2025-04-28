import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const WelcomePage = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 flex flex-col text-center relative overflow-hidden px-6">

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

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen space-y-8">

        <h1 className="text-5xl sm:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 animate-fade-in">
          Welcome to M32 AI 🚀
        </h1>

        <p className="text-gray-300 text-lg sm:text-xl max-w-2xl">
          Create powerful rubrics, assignments, and feedback in seconds. Organize, track, and manage your educational workflow with ease!
        </p>

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

        <div className="mt-12 flex justify-center">
  <div className="animate-bounce text-4xl text-purple-400">
    ↓
  </div>
</div>

      </div>

      {/* Quick Guide Section */}
      <div className="relative z-10 mt-20 max-w-5xl mx-auto space-y-20 py-16">

        {/* Section Title */}
        <div className="space-y-3" data-aos="fade-up">
          <h2 className="text-4xl font-bold">Quick Guide 🧭</h2>
          <p className="text-gray-400">Explore what each page helps you achieve inside M32 AI</p>
        </div>

        {/* Dashboard */}
        <div className="flex flex-col md:flex-row items-center gap-8" data-aos="fade-right">
          <div className="text-5xl">📄</div>
          <div className="text-left">
            <h3 className="text-2xl font-semibold mb-2">Dashboard</h3>
            <p className="text-gray-400">
              Instantly generate AI-powered content — Rubrics, Assignments, Feedback — by typing your topic or uploading a file.
            </p>
          </div>
        </div>

        {/* History */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-8" data-aos="fade-left">
          <div className="text-5xl">📜</div>
          <div className="text-left">
            <h3 className="text-2xl font-semibold mb-2">History</h3>
            <p className="text-gray-400">
              Automatically saves all your generated outputs. Browse and revisit your previous generations anytime.
            </p>
          </div>
        </div>

        {/* Courses */}
        <div className="flex flex-col md:flex-row items-center gap-8" data-aos="fade-right">
          <div className="text-5xl">📚</div>
          <div className="text-left">
            <h3 className="text-2xl font-semibold mb-2">Courses</h3>
            <p className="text-gray-400">
              Organize your AI content into different courses. Perfect for managing multiple subjects, projects, or clients.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default WelcomePage;

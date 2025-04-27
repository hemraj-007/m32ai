import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="bg-gray-900 border-b border-gray-700 px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gradient bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
        M32 AI 🧠
      </h1>

      <div className="flex items-center gap-6">
        <Link to="/dashboard" className="text-gray-300 hover:text-purple-400 transition">
          Dashboard
        </Link>
        <Link to="/history" className="text-gray-300 hover:text-purple-400 transition">
          History
        </Link>
        <Link to="/courses" className="text-gray-300 hover:text-purple-400 transition">
          Courses
        </Link>
        <button
          onClick={handleLogout}
          className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full text-sm transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

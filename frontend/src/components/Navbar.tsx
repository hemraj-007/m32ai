import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-gray-900/70 backdrop-blur-md border-b border-gray-700 px-8 py-4 flex justify-between items-center shadow-md">
      
      {/* Logo - Clickable to Welcome Page */}
      <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent hover:opacity-90 transition">
        M32 AI 🧠
      </Link>

      {/* Navigation links */}
      <div className="flex items-center gap-6">
        {[
          { name: 'Dashboard', path: '/dashboard' },
          { name: 'History', path: '/history' },
          { name: 'Courses', path: '/courses' },
        ].map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`px-4 py-2 rounded-full text-sm font-medium transition
              ${
                isActive(item.path)
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
          >
            {item.name}
          </Link>
        ))}

        {/* Logout button */}
        <button
          onClick={handleLogout}
          className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full text-sm font-semibold transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

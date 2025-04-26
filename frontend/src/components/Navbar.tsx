import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-3 shadow-sm flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-600">M32 AI 🧠</h1>
      <div className="space-x-4">
        <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">Dashboard</Link>
        <Link to="/history" className="text-gray-700 hover:text-blue-600">History</Link>
        <Link to="/courses" className="text-gray-700 hover:text-blue-600">
          Courses
        </Link>
        <button onClick={handleLogout} className="text-red-500 hover:underline">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import API from '../api/api';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const res = await API.post('/auth/register', formData);
      localStorage.setItem('token', res.data.token);
      toast.success('Welcome to M32 AI! 🎉');
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Banner */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-purple-600 to-pink-500 justify-center items-center p-10">
        <div className="text-white space-y-4">
          <h1 className="text-4xl font-extrabold leading-tight">Join M32 AI 🧠</h1>
          <p className="text-lg">Unlock the power of AI to create rubrics, assignments, and feedback for educators effortlessly.</p>
        </div>
      </div>

      {/* Right Side - Register Form */}
      <div className="w-full md:w-1/2 bg-gray-900 flex flex-col justify-center p-8">
        <div className="max-w-md w-full mx-auto space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-center text-white">Create your account 📝</h2>
            <p className="text-center text-gray-400 text-sm">Start your journey with M32 AI</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="name"
              onChange={handleChange}
              placeholder="Full Name"
              required
              className="w-full rounded-full border border-gray-700 bg-gray-800 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <input
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="Email"
              required
              className="w-full rounded-full border border-gray-700 bg-gray-800 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <input
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full rounded-full border border-gray-700 bg-gray-800 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            {error && <p className="text-red-400 text-sm text-center">{error}</p>}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 rounded-full shadow-md hover:opacity-90 transition flex items-center justify-center"
            >
              {isLoading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                  />
                </svg>
              ) : (
                "Register"
              )}
            </button>
          </form>

          <p className="text-center text-sm text-gray-400">
            Already have an account?{' '}
            <a href="/" className="text-purple-400 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

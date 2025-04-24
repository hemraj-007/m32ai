import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/api';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await API.post('/auth/register', formData);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 shadow-lg rounded-xl w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-gray-800">Create an Account 📝</h2>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          placeholder="Full Name"
          required
          className="input"
        />
        <input
          type="email"
          name="email"
          onChange={handleChange}
          placeholder="Email"
          required
          className="input"
        />
        <input
          type="password"
          name="password"
          onChange={handleChange}
          placeholder="Password"
          required
          className="input"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded transition"
        >
          Register
        </button>
        <p className="text-center text-sm text-gray-500">
          Already have an account? <a href="/" className="text-blue-600 hover:underline">Login</a>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;

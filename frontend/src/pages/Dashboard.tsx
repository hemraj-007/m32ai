import { useState } from 'react';
import Layout from '../components/Layout';
import API from '../api/api';

const Dashboard = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!prompt) return;
    setLoading(true);
    setResponse('');
    setError('');

    try {
      const token = localStorage.getItem('token');
      const res = await API.post(
        '/generate',
        { prompt },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setResponse(res.data.response);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to generate');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">AI Content Generator 🧠</h2>
        <textarea
          className="w-full h-32 border border-gray-300 rounded p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter a prompt (e.g. Generate a rubric for class 10 science)..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button
          onClick={handleGenerate}
          className="bg-blue-600 text-white font-medium px-5 py-2 rounded hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate Response'}
        </button>

        {error && <p className="text-red-500">{error}</p>}

        {response && (
          <div className="bg-gray-100 p-4 rounded mt-4 whitespace-pre-line border border-gray-300">
            <h3 className="font-semibold text-gray-700 mb-2">Generated Response:</h3>
            <p>{response}</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;

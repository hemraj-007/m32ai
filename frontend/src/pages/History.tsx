import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import API from '../api/api';

interface Generation {
  _id: string;
  prompt: string;
  response: string;
  createdAt: string;
  type: 'rubric' | 'feedback' | 'assignment';
}

const History = () => {
  const [history, setHistory] = useState<Generation[]>([]);
  const [error, setError] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'rubric' | 'feedback' | 'assignment'>('all');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await API.get('/history', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setHistory(res.data.history);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load history');
      }
    };

    fetchHistory();
  }, []);

  const filteredHistory = filterType === 'all'
    ? history
    : history.filter((item) => item.type === filterType);

  return (
    <Layout>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-white">Your History 📜</h2>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-4">
          {['all', 'rubric', 'assignment', 'feedback'].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type as 'all' | 'rubric' | 'assignment' | 'feedback')}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                filterType === type
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        {/* Error Message */}
        {error && <p className="text-red-400">{error}</p>}

        {/* History List */}
        {filteredHistory.length === 0 ? (
          <p className="text-gray-400">No matching history found.</p>
        ) : (
          <div className="space-y-4">
            {filteredHistory.map((item) => (
              <div
                key={item._id}
                className="bg-gray-800 border border-gray-700 rounded-lg p-5 space-y-3 shadow-md hover:shadow-lg transition"
              >
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>{new Date(item.createdAt).toLocaleString()}</span>
                  <span className="capitalize px-2 py-1 bg-blue-600 text-white rounded-full text-xs font-bold">
                    {item.type}
                  </span>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-100 mb-1">Prompt</h3>
                  <p className="text-gray-300">{item.prompt}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-100 mb-1">Response</h3>
                  <p className="whitespace-pre-line text-gray-300">{item.response}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default History;
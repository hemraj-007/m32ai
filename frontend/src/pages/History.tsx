import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import API from '../api/api';

interface Generation {
  _id: string;
  prompt: string;
  response: string;
  createdAt: string;
}

const History = () => {
  const [history, setHistory] = useState<Generation[]>([]);
  const [error, setError] = useState('');

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

  return (
    <Layout>
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">Your History</h2>
        {error && <p className="text-red-500">{error}</p>}

        {history.length === 0 ? (
          <p className="text-gray-500">No history yet. Start generating some content!</p>
        ) : (
          <div className="space-y-4">
            {history.map((item) => (
              <div
                key={item._id}
                className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition rounded-lg p-5 space-y-3"
              >
                <p className="text-sm text-gray-400">
                  {new Date(item.createdAt).toLocaleString()}
                </p>
                <div>
                  <h3 className="font-semibold text-gray-700 mb-1">Prompt</h3>
                  <p className="text-gray-800">{item.prompt}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700 mb-1">Response</h3>
                  <p className="whitespace-pre-line text-gray-700">{item.response}</p>
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

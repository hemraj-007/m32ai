import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import API from '../api/api';
import { toast } from 'react-hot-toast';

interface Generation {
  _id: string;
  prompt: string;
  response: string;
  createdAt: string;
}

const CoursePage = () => {
  const { id } = useParams<{ id: string }>();
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [generations, setGenerations] = useState<Generation[]>([]);
  const [error, setError] = useState('');
  const [courseName, setCourseName] = useState<string>('');

  const fetchGenerations = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await API.get(`/history?courseId=${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGenerations(res.data.history);
    } catch {
      setError('Failed to load generations.');
    }
  };

  const fetchCourseName = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await API.get(`/courses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourseName(res.data.name); // Assuming backend returns { name: 'course name' }
    } catch {
      setCourseName('Untitled Course');
    }
  };

  useEffect(() => {
    if (id) {
      fetchGenerations();
      fetchCourseName();
    }
  }, [id]);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await API.post(
        '/generate',
        { prompt, courseId: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchGenerations();
      setPrompt('');
      toast.success('🧠 Content generated successfully!');
    } catch {
      toast.error('❌ Failed to generate content');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-white">
            {courseName ? courseName : 'Loading...'}
          </h1>
          <p className="text-gray-500 text-xs">ID: {id}</p>
        </div>

        {/* AI Prompt Section */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your topic or instruction..."
            className="w-full px-4 py-3 border border-gray-600 rounded-full bg-gray-700 text-white focus:ring-2 focus:ring-blue-400 text-sm"
          />
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-5 py-2 rounded-full hover:opacity-90 transition text-sm"
          >
            {loading ? 'Generating...' : 'Generate'}
          </button>
        </div>

        {/* Error */}
        {error && <p className="text-red-500">{error}</p>}

        {/* History */}
        <div className="space-y-4">
          {generations.length === 0 ? (
            <div className="text-center text-gray-400 italic mt-10">
              No content generated yet. Start by typing something above!
            </div>
          ) : (
            generations.map((gen) => (
              <div key={gen._id} className="bg-gray-800 border border-gray-700 p-5 rounded-xl space-y-2">
                <div>
                  <h3 className="text-gray-400 font-semibold mb-1">Prompt:</h3>
                  <p className="text-gray-200">{gen.prompt}</p>
                </div>
                <div>
                  <h3 className="text-gray-400 font-semibold mb-1">Response:</h3>
                  <p className="text-gray-300 whitespace-pre-line">{gen.response}</p>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </Layout>
  );
};

export default CoursePage;

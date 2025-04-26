import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import API from '../api/api';

interface Course {
  _id: string;
  name: string;
  createdAt: string;
}

// Dummy course names
const dummyCourses = ['Class 10 Science', 'Grade 12 English', 'History 101'];

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [newCourse, setNewCourse] = useState('');
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);
  const [editingCourseName, setEditingCourseName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await API.get('/courses', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.courses.length === 0) {
        // Auto-create dummy courses
        for (const name of dummyCourses) {
          await API.post('/courses', { name }, {
            headers: { Authorization: `Bearer ${token}` },
          });
        }

        // Fetch again after creating dummy
        const refreshed = await API.get('/courses', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCourses(refreshed.data.courses);
      } else {
        setCourses(res.data.courses);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load courses');
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleAddCourse = async () => {
    if (!newCourse.trim()) return;

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await API.post('/courses', { name: newCourse }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourses([res.data.course, ...courses]);
      setNewCourse('');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to add course');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCourse = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      await API.delete(`/courses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourses(courses.filter(course => course._id !== id));
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete course');
    }
  };

  const handleStartEditing = (course: Course) => {
    setEditingCourseId(course._id);
    setEditingCourseName(course.name);
  };

  const handleSaveEdit = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      const res = await API.put(`/courses/${id}`, { name: editingCourseName }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourses(courses.map(c => (c._id === id ? res.data.course : c)));
      setEditingCourseId(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update course');
    }
  };

  const handleCancelEdit = () => {
    setEditingCourseId(null);
    setEditingCourseName('');
  };

  return (
    <Layout>
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">Your Courses 📚</h2>

        {/* Add New Course */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="New course name"
            value={newCourse}
            onChange={(e) => setNewCourse(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
          <button
            onClick={handleAddCourse}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            {loading ? 'Adding...' : '+ Add'}
          </button>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500">{error}</p>}

        {/* Course List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.length === 0 ? (
            <p className="text-gray-500">No courses yet. Start by adding one!</p>
          ) : (
            courses.map((course) => (
              <div key={course._id} className="bg-white border p-4 rounded shadow hover:shadow-md transition relative">
                
                {editingCourseId === course._id ? (
                  <div className="flex flex-col gap-2">
                    <input
                      type="text"
                      value={editingCourseName}
                      onChange={(e) => setEditingCourseName(e.target.value)}
                      className="border border-gray-300 rounded px-2 py-1"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSaveEdit(course._id)}
                        className="text-green-600 hover:underline text-sm"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="text-gray-500 hover:underline text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h3 className="text-lg font-semibold text-gray-800">{course.name}</h3>
                    <p className="text-xs text-gray-500">Created: {new Date(course.createdAt).toLocaleDateString()}</p>

                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => handleStartEditing(course)}
                        className="text-blue-600 hover:underline text-sm"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDeleteCourse(course._id)}
                        className="text-red-600 hover:underline text-sm"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Courses;

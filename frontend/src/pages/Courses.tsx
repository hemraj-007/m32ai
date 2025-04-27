import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import API from '../api/api';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';


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
      toast.success('✅ Course created successfully!');
    } catch (err: any) {
      toast.error('❌ Failed to create course');
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
      toast.success('🗑️ Course deleted successfully!');
    } catch (err: any) {
      toast.error('❌ Failed to delete course');
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
      toast.success('✏️ Course updated successfully!');
    } catch (err: any) {
      toast.error('❌ Failed to update course');
    }
  };


  const handleCancelEdit = () => {
    setEditingCourseId(null);
    setEditingCourseName('');
  };

  return (
    <Layout>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-white">Your Courses 📚</h2>

        {/* Add New Course */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="New course name"
            value={newCourse}
            onChange={(e) => setNewCourse(e.target.value)}
            className="border border-gray-700 bg-gray-800 rounded-full px-4 py-2 w-full text-gray-200 placeholder-gray-400"
          />
          <button
            onClick={handleAddCourse}
            disabled={loading}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold px-10 py-2 rounded-full shadow-md hover:opacity-90 transition-all"
          >
            {loading ? 'Adding...' : '+ Add'}
          </button>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500">{error}</p>}

        {/* Course List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {courses.length === 0 ? (
            <p className="text-gray-400">No courses yet. Start by adding one!</p>
          ) : (
            courses.map((course) => (
              <div
                key={course._id}
                className="bg-gray-800 border border-gray-700 p-5 rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-[1.02] relative"
              >
                {editingCourseId === course._id ? (
                  <div className="flex flex-col gap-3">
                    <input
                      type="text"
                      value={editingCourseName}
                      onChange={(e) => setEditingCourseName(e.target.value)}
                      className="border border-gray-600 rounded-full px-4 py-2 bg-gray-700 text-gray-100"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleSaveEdit(course._id);
                        }}
                        className="border border-green-400 text-green-300 hover:bg-green-400 hover:text-white px-4 py-1 rounded-full text-xs font-medium transition"
                      >
                        ✅ Save
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleCancelEdit();
                        }}
                        className="border border-gray-400 text-gray-400 hover:bg-gray-500 hover:text-white px-4 py-1 rounded-full text-xs font-medium transition"
                      >
                        ❌ Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Wrap only course name in Link */}
                    <Link to={`/course/${course._id}`}>
                      <h3 className="text-xl font-semibold text-white hover:underline hover:text-purple-400 transition">
                        {course.name}
                      </h3>
                    </Link>

                    <p className="text-xs text-gray-400 mt-1">
                      Created: {new Date(course.createdAt).toLocaleDateString()}
                    </p>

                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleStartEditing(course);
                        }}
                        className="border border-purple-400 text-purple-300 hover:bg-purple-500 hover:text-white px-4 py-1 rounded-full text-xs font-medium transition"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleDeleteCourse(course._id);
                        }}
                        className="border border-red-400 text-red-300 hover:bg-red-500 hover:text-white px-4 py-1 rounded-full text-xs font-medium transition"
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

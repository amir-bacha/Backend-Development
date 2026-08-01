import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ViewPost = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGetPosts = async () => {
    setLoading(true);
    setMessage('');
    try {
      const token = localStorage.getItem('token');

      const res = await fetch('http://localhost:3000/myposts', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();

      if (res.ok) {
        setPosts(data.posts);
        if (data.posts.length === 0) {
          setMessage('No posts found.');
        }
      } else {
        setMessage(data.message || 'Failed to fetch posts');
      }
    } catch (error) {
      setMessage('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        View Your Posts
      </h1>

      <button
        onClick={handleGetPosts}
        disabled={loading}
        className="bg-orange-600 hover:bg-orange-700 text-white font-medium px-6 py-3 rounded-lg shadow transition-colors mb-4 disabled:opacity-50"
      >
        {loading ? 'Loading...' : 'Get your post'}
      </button>

      <button
        onClick={() => navigate('/')}
        className="text-orange-600 hover:text-orange-700 font-medium text-sm mb-8"
      >
        ← Back to Home
      </button>

      {message && (
        <p className="text-gray-600 mb-4">{message}</p>
      )}

      <div className="w-full max-w-2xl flex flex-col gap-4">
        {posts.map((post) => (
          <div
            key={post._id}
            className="bg-white shadow-md rounded-lg p-6"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {post.title}
            </h2>
            <p className="text-gray-600">{post.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewPost;
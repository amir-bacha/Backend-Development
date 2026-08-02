import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PostCard from './postCard';

const ViewPost = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGetPosts = async () => {
    setLoading(true);
    setMessage('');
    try {
      const response = await axios.get('http://localhost:3000/api/posts', {
        withCredentials: true,
      });
      console.log(response.data);
      setPosts(response.data.posts || response.data); // adjust based on your API shape
    } catch (error) {
      console.log('error while fetching posts: ', error);
      setMessage('Only logged user can see hist posts');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">View Your Posts</h1>

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

      {message && <p className="text-gray-600 mb-4">{message}</p>}

      <div className="w-full max-w-2xl flex flex-col gap-4">
        {posts.map((post) => (
          <PostCard key={post._id} title={post.title} description={post.description} />
        ))}
      </div>
    </div>
  );
};

export default ViewPost;
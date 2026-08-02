import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Post = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
     try{
       const response= await axios.post('http://localhost:3000/api/posts', formData,{
        withCredentials:true,
      });
     console.log(response.data);
     if(response.status===401){
      setMessage("You should log in first");
     }
     setMessage('Post created successfully!');
     setFormData({ title: '', description: '' });    
    setTimeout(() => {
      setMessage('')
    }, 3000);
    
     }
     catch(error){
      console.log('error while creating post: ',error);
      setMessage('Log first then create post');
     }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Write a Post
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter post title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="5"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              placeholder="Write your post description"
            />
          </div>

          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 rounded-lg transition-colors mt-2"
          >
            Publish Post
          </button>

          {message && (
            <p className="text-center text-sm text-green-600 mt-2">{message}</p>
          )}
        </form>

        <button
          onClick={() => navigate('/')}
          className="w-full mt-4 text-purple-600 hover:text-purple-700 font-medium text-sm text-center"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
};

export default Post;
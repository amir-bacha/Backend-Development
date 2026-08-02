import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/users/login', formData, {
            withCredentials: true
        });
      
        console.log(response.data.message)
        if(response.status===200){
          setSuccessMessage(response.data.message);
          setFormData({
            email:"",
            password:"",
          })
        }
        if(response.status===400){
          console.log("salam")
          setSuccessMessage(response.data.message);
           setFormData({
            email:"",
            password:"",
          })
        }
        if(response.status===401){
           setFormData({
            email:"",
            password:"",
          })
        }

    } catch (error) {
      console.log("request error",error)
      setMessage(error.message);
      if(error.status===400){
        setSuccessMessage(error.data)
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Login
        </h1>
        <div className="text-green-600"><p>{successMessage}</p></div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg transition-colors mt-2"
          >
            Login
          </button>

          {message && (
            <p className="text-center text-sm text-gray-600 mt-2">{message}</p>
          )}
        </form>

        <button
          onClick={() => navigate('/')}
          className="w-full mt-4 text-green-600 hover:text-green-700 font-medium text-sm text-center"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
};

export default Login;
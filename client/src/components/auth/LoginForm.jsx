import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../store/auth';
const backendUrl = import.meta.env.VITE_BACKEND_URL

function LoginForm() {
  const [loginData, setLoginData] = useState({
    userName: '',
    password: '',
  });

  const navigate = useNavigate();
  const { storeTokenInLS } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Login Data Submitted:', loginData);

    try {

      const response = await fetch(`${backendUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok)
        { 
          alert("Login successful");
          const res_data = await response.json();
          console.log("response from server : ", res_data); 

          storeTokenInLS(res_data.token);
  
          setLoginData({
            userName: '',
            password: '',
          });
  
          navigate("/");
        } else {
          alert("Login failed");
          console.log("Login failed");
        }

      console.log('Response:', response);
    } catch (error) {
      console.error('Error login:', error);
    }
  };

  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md -z-0">
        <h2 className="text-4xl font-extrabold text-white mb-6 text-center">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-purple-300 mb-2">Username</label>
          <input
            type="text"
            name="userName"
            value={loginData.userName}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            placeholder="Enter your username"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-purple-300 mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            placeholder="Enter your password"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-purple-500 text-white py-2 rounded-lg font-bold hover:bg-purple-600 focus:outline-none focus:ring-4 focus:ring-purple-400"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;

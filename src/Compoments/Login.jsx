import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ SetAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateForm = () => {
    let formErrors = {};
    if (!email) {
      formErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      formErrors.email = 'Email is not valid';
    }

    if (!password) {
      formErrors.password = 'Password is required';
    } else if (password.length < 6) {
      formErrors.password = 'Password must be at least 6 characters long';
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          localStorage.setItem('token', data.token);
          
          alert('Login successful');
          SetAuthenticated(true);
          navigate('/dashboard');
        } else {
          setErrors({ api: data.message || 'Login failed' });
          alert('Login failed: ' + (data.message || 'Login failed'));
        }
      } catch (error) {
        console.error('Error during fetch:', error);
        setErrors({ api: 'Server error. Please try again later.' });
        alert('Server error. Please try again later.');
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white rounded-lg border-2 border-blue-500 flex flex-col justify-center p-8 font-bold text-2xl font-serif text-blue-600 w-full max-w-md md:max-w-lg lg:max-w-xl">
        <h1 className="text-center mb-6">Login</h1>
        <form className="text-lg" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="w-full p-2 rounded-lg border-2 border-slate-500 mt-1"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="w-full p-2 rounded-lg border-2 border-slate-500 mt-1"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <p className="text-red-500">{errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-700 text-white mt-3 rounded-full"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

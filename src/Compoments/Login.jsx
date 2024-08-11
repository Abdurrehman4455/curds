import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({setAuthenticated}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate= useNavigate();
 


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

  const handleSubmit =async (e) => {
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
        
          navigate('/dashboard')
         
         
     
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
    <div className="flex justify-center items-center">
      <div className="bg-white h-[500px] rounded-lg w-[30%] border-[2px] border-blue-500 mt-10 flex justify-center p-10 font-bold text-[40px] font-serif text-blue-600">
        <div className="flex-col items-center">
          <div className="w-[40%]">Login</div>
          <div className="flex justify-center p-10">
            <form className="text-[20px]" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label>Email</label>
                <input
                  type="email"
                  className="w-[20rem] rounded-lg border-[2px] border-slate-500 mt-1"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <p className="text-red-500">{errors.email}</p>}
              </div>
              <div className="mb-4">
                <label>Password</label>
                <input
                  type="password"
                  className="w-[20rem] rounded-lg border-[2px] border-slate-500 mt-1"
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
                className="px-5 py-5 bg-blue-700 text-white mt-3 rounded-full"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

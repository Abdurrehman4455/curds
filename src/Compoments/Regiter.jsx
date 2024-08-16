import { useState } from 'react';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

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

    if (!confirmPassword) {
      formErrors.confirmPassword = 'Confirm Password is required';
    } else if (password !== confirmPassword) {
      formErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    if (validateForm()) {
      try {
        const response = await fetch('http://localhost:5000/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password, confirmPassword }),
        });

        const data = await response.json();
        if (response.ok) {
          setSuccessMessage(`Verification email sent to ${email}. Please check your inbox.`);
          setEmail('');
          setPassword('');
          setConfirmPassword('');
          setErrors({});
        } else {
          setErrors({ api: data.message });
        }
      } catch (error) {
        setErrors({ api: 'Server error. Please try again later.' });
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white w-full max-w-md rounded-lg border-2 border-blue-500 p-6 md:p-10 shadow-lg">
        <h1 className="text-center text-2xl md:text-4xl font-bold text-blue-600 mb-5">Register</h1>
        {successMessage && (
          <p className="text-green-500 mb-4 text-center">{successMessage}</p>
        )}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <h1 className='text-center'>enter your verified email </h1>
          <div>
            <label className="block text-lg">Email</label>
            <input
              type="email"
              className="w-full rounded-lg border-2 border-slate-500 mt-1 p-2"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-lg">Password</label>
            <input
              type="password"
              className="w-full rounded-lg border-2 border-slate-500 mt-1 p-2"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>
          <div>
            <label className="block text-lg">Confirm Password</label>
            <input
              type="password"
              className="w-full rounded-lg border-2 border-slate-500 mt-1 p-2"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
            )}
          </div>
          {errors.api && <p className="text-red-500 text-sm mt-1">{errors.api}</p>}
          <button 
            type="submit"
            className="w-full px-5 py-3 bg-blue-700 text-white mt-3 rounded-full hover:bg-blue-800 transition-colors"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;

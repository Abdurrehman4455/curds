import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const VerifyEmail = ({SetAuthenticated}) => {
  const navigate = useNavigate();
  const [isVerifying, setIsVerifying] = useState(false);


  const handleVerify = async () => {
    setIsVerifying(true);
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get('token');

    if (token) {
      try {
        const response = await fetch(`http://localhost:5000/api/auth/verify-email?token=${token}`, {
          method: 'GET',
        });

        if (response.ok) {
          const data = await response.json();
          
          // Store the JWT token in localStorage
          localStorage.setItem('token', data.authToken);
          const decodedToken = jwtDecode(data.authToken);
          console.log('Decoded Token:', decodedToken);

         
         
          // Redirect to the dashboard
          alert("Verification successful! Redirecting to your dashboard...");
         
          navigate('/dashboard')
          // Redirect to dashboard on successful verification
       
        } else {
          const errorData = await response.json(); // Get detailed error message
          console.error('Verification failed:', errorData.message);
          alert(`Verification failed: ${errorData.message}`);
        }
      }
       catch (error) {
        console.error('Error verifying email:', error);
        alert('An error occurred during verification. Please try again later.');
      }
    } else {
      alert('No token found. Invalid verification link.');
    }
    setIsVerifying(false);
  };

  return (
    <div>
      <h2 className='font-bold text-[15px]'>Click the button below to verify your email.</h2>
      <button onClick={handleVerify} disabled={isVerifying} className='bg-green-500 text-white px-5 py-5'>
        {isVerifying ? 'Verifying...' : 'Verify Email'}
      </button>
    </div>
  );
};

export default VerifyEmail;

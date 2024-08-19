import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerify = async () => {
    setIsVerifying(true);
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get('token');

    if (token) {
      try {
        const response = await fetch(`http://localhost:5000/api/auth/verify-email?token=${encodeURIComponent(token)}`, {
          method: 'GET',
        });

        if (response.ok) {
          // Redirect to dashboard on successful verification
          navigate('/dashboard');
        } else {
          const errorData = await response.json(); // Get detailed error message
          console.error('Verification failed:', errorData.message);
          alert(`Verification failed: ${errorData.message}`);
        }
      } catch (error) {
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

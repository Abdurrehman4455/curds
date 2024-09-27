import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode}from 'jwt-decode'; // Make sure this is imported correctly

const VerifyEmail = ({ SetAuthenticated }) => {
  const navigate = useNavigate();
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
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

            // Mark the user as authenticated
            SetAuthenticated(true);

            // Redirect to the dashboard
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

    // Automatically call handleVerify when the component mounts
    handleVerify();
  }, [navigate, SetAuthenticated]);

  return (
    <div>
      <h2 className='font-bold text-[15px]'>Verifying your email...</h2>
      {isVerifying && <p>Verifying...</p>}
    </div>
  );
};

export default VerifyEmail;

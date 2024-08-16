import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
  const navigates= useNavigate();
  useEffect(() => {
    const verifyToken = async () => {
      const queryParams = new URLSearchParams(window.location.search);
      const token = queryParams.get('token');
      const navigates=useNavigate();

      if (token) {
        try {
          const response = await fetch(`http://localhost:5000/api/auth/verify-email?token=${token}`, {
            method: 'GET',
          });

          if (response.ok) {
            // Redirect to dashboard on successful verification
            navigates('/dashboard');
          } else {
            console.error('Verification failed');
            // You can add logic here to show an error message to the user
          }
        } catch (error) {
          console.error('Error verifying email:', error);
          // You can add logic here to show an error message to the user
        }
      }
    };

    verifyToken();
  }, [history]);

  return <div>Verifying your email...</div>;
};

export default VerifyEmail;

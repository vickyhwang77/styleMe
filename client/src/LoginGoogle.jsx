import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode, InvalidTokenError } from 'jwt-decode';
import axios from 'axios';

function GoogleLogin() {
  const [userInfo, setUserInfo] = useState(null);
  const [userNotFound, setUserNotFound] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://apis.google.com/js/platform.js';
        script.async = true;
        script.defer = true;
        script.onload = resolve;
        document.head.appendChild(script);
      });

      google.accounts.id.initialize({
        client_id: '698726625190-41vi7mvqele9t2p7m99m63ra5j3mtj3g.apps.googleusercontent.com',
        callback: handleCallbackResponse,
      });

      google.accounts.id.renderButton(
        document.getElementById('loginDiv'),
        { theme: 'outline', size: 'large' }
      );
    } catch (error) {
      console.error('Error initializing Google Sign-In:', error);
    }
  };

  const handleCallbackResponse = (response) => {
    try {
      const decodedToken = jwtDecode(response.credential);
      setUserInfo(decodedToken);

      fetchUserInfo(decodedToken.email);
    } catch (error) {
      if (error instanceof InvalidTokenError) {
        console.error('Invalid JWT:', error.message);
      } else {
        console.error('Error decoding JWT:', error);
      }
    }
  };

  const fetchUserInfo = async (email) => {
    try {
      const response = await axios.get(`http://localhost:3001/user/${email}`);
  
      if (response.data) {
        // User found, navigate to home
        const userData = response.data;
        navigate('/home', { state: { user: userData } });
      } else {
        // User not found, suggest registration
        const confirmSignUp = window.confirm('You don\'t have an account. Do you want to sign up?');
  
        if (confirmSignUp) {
          // Create a new user and navigate to home
          const newUserResponse = await axios.post('http://localhost:3001/register', {
            email,
            city: 'defaultCity',
            style: 'defaultStyle',
            gender: 'defaultGender',
          });
  
          if (newUserResponse.data) {
            const newUser = newUserResponse.data;
            navigate('/home', { state: { user: newUser } });
          } else {
            console.error('Error creating a new user.');
          }
        } else {
          // User chose not to sign up
          console.log('User chose not to sign up.');
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // Handle 404 error when user is not found
        setUserNotFound(true);
      } else {
        // Handle other errors
        console.error('Error fetching user info:', error);
      }
    }
  };

  useEffect(() => {
    handleLogin();
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#E6E6FA' }}>
      <div className="text-center p-4 rounded bg-white">
        {/* Banner and Message */}
        <div className="mb-4">
          <h2 style={{ color: '#FF69B4' }}> Welcome back! Sign in to see your outfits!</h2>
        </div>

        <div className="d-flex justify-content-center mb-3">
          <div id="loginDiv"></div>
        </div>
        
        {userInfo && (
          <div>
            <p>Hello {userInfo.given_name}. Your email is {userInfo.email}.</p>
            <img src={userInfo.picture} alt="Profile" className="rounded-circle" />
          </div>
        )}

        {userNotFound && (
          <div>
            <p>You don't have an account. Please register first.</p>
            <button
              onClick={() => navigate('/registerwithgoogle')}
              className="btn btn-success rounded-0"
              style={{
                backgroundColor: 'pink',
                border: 'none',
                padding: '10px 20px',
                fontSize: '16px',
                fontWeight: 'bold',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
            >
              Register
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default GoogleLogin;

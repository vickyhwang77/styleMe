import React from 'react';
import { Link } from 'react-router-dom';

import closet from './closet.png'; // Import the image

const Landing = () => {
  return (
    <div style={{ backgroundColor: '#E6E6FA', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', position: 'relative' }}>
      <div style={{ textAlign: 'center', backgroundColor: 'white', padding: '20px', borderRadius: '10px', marginBottom: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <h1 style={{ fontSize: '2em', color: '#FF69B4', margin: '10px 0' }}>Welcome to StyleMe</h1>
        <p style={{ fontSize: '1.2em', color: '#333' }}>Discover your unique style with the ultimate fashion companion.</p>
      </div>
      <div style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: 'white', padding: '10px', borderRadius: '5px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <Link to="/googlelogin" style={{ textDecoration: 'none', color: '#FF69B4', fontSize: '1.2em' }}>Login</Link>
      </div>
      <div>
        <Link to="/registerwithgoogle" style={{ textDecoration: 'none' }}>
          <button style={{ backgroundColor: '#FF69B4', color: 'white', padding: '15px 30px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '1.2em' }}>Get Started</button>
        </Link>
      </div>

      {/* Image Section */}
      <div style={{ textAlign: 'center', marginTop: '20px', marginBottom: '20px' }}>
        <img src={closet} alt="Landing Image" style={{ width: '80%', maxWidth: '600px'}} />
      </div>
    </div>
  );
};

export default Landing;

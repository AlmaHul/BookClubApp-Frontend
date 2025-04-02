import React from 'react';
import { useAuth } from '../auth/AuthProvider';

const HomePage = () => {
  const { isLoggedIn, user } = useAuth();
  console.log("Auth status:", isLoggedIn, "User:", user);


  return (
      <div className="main-content">
<h2>Chatta med ai-</h2>
    </div>
  );
};

export default HomePage;
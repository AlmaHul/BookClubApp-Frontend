// OBS: Placeholder HomePage – stil & innehåll utvecklas av [Ali]

import React from 'react';
import { useAuth } from '../auth/AuthProvider';

const HomePage = () => {
  const { isLoggedIn, user } = useAuth();
  console.log("Auth status:", isLoggedIn, "User:", user);


  return (
      <div className="main-content">
    <div className="p-8 text-center">
      <h1 className="text-2xl font-bold">HomePage</h1>
      {isLoggedIn && <p>Du är inloggad ✅</p>}
    </div>
    </div>
  );
};

export default HomePage;
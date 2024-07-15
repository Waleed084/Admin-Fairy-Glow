import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  // Redirect to login page on component mount
  useEffect(() => {
    navigate('/pages/login/login3');
  }, [navigate]);

  // You can also render some content if needed
  return <div>Redirecting to login page...</div>;
};

export default Home;

import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState(() => {
    const storedUsername = localStorage.getItem('authenticatedUsername');
    const sessionUsername = sessionStorage.getItem('authenticatedUsername');
    if (storedUsername && !sessionUsername) {
      // if storedUsername exists and sessionUsername does not, it means browser is reopened
      localStorage.removeItem('authenticatedUsername');
      return '';
    }
    return storedUsername || '';
  });

  const [fullName, setFullName] = useState('');

  useEffect(() => {
    // Fetch the full name of the user when the username changes
    if (username) {
      axios
        .get(`${process.env.REACT_APP_API_HOST}/api/users/fullname/${username}`)
        .then((response) => {
          setFullName(response.data.fullName);
        })
        .catch((error) => {
          console.error('Error fetching full name:', error);
        });
    } else {
      setFullName('');
    }
  }, [username]);

  const setAuthenticatedUsername = (newUsername) => {
    localStorage.setItem('authenticatedUsername', newUsername);
    sessionStorage.setItem('authenticatedUsername', newUsername);
    setUsername(newUsername);
  };

  useEffect(() => {
    const handleUnload = () => {
      // Check if sessionStorage still has the username
      if (!sessionStorage.getItem('authenticatedUsername')) {
        localStorage.removeItem('authenticatedUsername');
        setUsername('');
        setFullName('');
      }
    };

    window.addEventListener('beforeunload', handleUnload);

    return () => {
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, []);

  return <AuthContext.Provider value={{ username, setAuthenticatedUsername, fullName }}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired // Prop validation for children
};

export const useAuth = () => {
  return useContext(AuthContext);
};

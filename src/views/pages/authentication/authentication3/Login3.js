import React from 'react';
import { CssBaseline, Container } from '@mui/material';
import LoginForm from '../LoginForm';
import loginAnimation from './loginAnimation.mp4';

const Login3 = () => {
  return (
    <div>
      <CssBaseline />
      <Container maxWidth="lg" style={{ padding: 0 }}>
        <div style={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
          <div
            style={{
              flex: '1',
              backgroundColor: 'white',
              boxSizing: 'border-box',
              order: 2
            }}
          >
            <video style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={loginAnimation} autoPlay muted loop />
          </div>
          <div
            style={{
              flex: '1',
              backgroundColor: 'white',
              padding: '1rem',
              boxSizing: 'border-box',
              order: 1
            }}
          >
            <LoginForm />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Login3;

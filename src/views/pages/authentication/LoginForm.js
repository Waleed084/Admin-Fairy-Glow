import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAuth } from 'views/pages/authentication/AuthContext';
// ... other imports
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function LoginForm() {
  const { setAuthenticatedUsername } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [toSignup, setToSignup] = useState(false);
  const [formData, setFormData] = useState({
    usernameOrEmail: '',
    password: ''
  });
  const [error, setError] = useState(''); // Define setError
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_HOST}/api/authenticate`, formData);

      console.log('Authentication Response:', response.data);
      if (response.data.success) {
        console.log('User is authenticated!');
        setAuthenticatedUsername(response.data.username);
        setIsAuthenticated(true);
      } else {
        console.log('Authentication failed. Please check your credentials.');
        setError('Try Again, Check your Credentials!');
      }
    } catch (error) {
      console.error('Error during authentication:', error);
      setError('Try Again, Check your Credentials!');
    }
  };
  const handleSignup = () => {
    setToSignup(true);
  };
  useEffect(() => {
    if (isAuthenticated) {
      // Perform redirection logic here, for example:
      console.log('isAuthenticated after setting:', isAuthenticated);
      navigate('/dashboard/default');
      // window.location.href = '/'; // Redirect to homepage
    }
  }, [isAuthenticated, navigate]);
  useEffect(() => {
    if (toSignup) {
      // Perform redirection logic here, for example:
      navigate('/pages/register/register3');
      // window.location.href = '/'; // Redirect to homepage
    }
  }, [toSignup, navigate]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Seller LogIn
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="usernameOrEmail"
                  value={formData.usernameOrEmail}
                  onChange={handleChange}
                  required
                  autoComplete="given-name"
                  fullWidth
                  id="email"
                  label="Enter Email"
                  autoFocus
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  label="Enter Password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel control={<Checkbox value="allowExtraEmails" color="primary" />} label="I Accept terms and conditions." />
              </Grid>
            </Grid>
            {error && <Typography color="error">{error}</Typography>}
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Button onClick={handleSignup} variant="body1">
                  Dont have an account? Sign Up
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}

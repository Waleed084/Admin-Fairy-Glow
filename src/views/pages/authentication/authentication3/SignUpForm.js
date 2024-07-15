import * as React from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { useNavigate } from 'react-router';

const CustomTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderRadius: '20px',
      borderColor: '#8e44ad' // Purple berry color
    },
    '&:hover fieldset': {
      borderColor: '#8e44ad'
    },
    '&.Mui-focused fieldset': {
      borderColor: '#8e44ad'
    }
  }
});

export default function SignUpForm() {
  const [errorMessage, setErrorMessage] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    confirmEmail: '',
    bankName: '',
    accountNumber: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateForm = () => {
    const errors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        errors[key] = 'This field is required';
      }
    });

    if (formData.email && !validateEmail(formData.email)) {
      errors.email = 'Invalid email address';
    }

    if (formData.email !== formData.confirmEmail) {
      errors.confirmEmail = 'Emails do not match';
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    console.log('Form Data:', formData);
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_HOST}/api/signup`, formData);
      if (response.data.success) {
        console.log('User registered successfully!');
        navigate('/pages/login/login3');
      } else {
        setErrorMessage('Authentication Failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setErrorMessage('Authentication Failed. Please try again.');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flexGrow: 1,
        overflowY: 'auto',
        height: '100vh',
        p: 2,
        width: '100%'
      }}
    >
      <Typography component="h1" variant="h3" sx={{ width: '100%', color: '#5106a4', fontWeight: 'bold', py: 3 }}>
        Sign up
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
        {errorMessage && (
          <Typography color="error" align="center" gutterBottom>
            {errorMessage}
          </Typography>
        )}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              fullWidth
              id="email"
              label="Email"
              error={!!formErrors.email}
              helperText={formErrors.email}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              name="confirmEmail"
              value={formData.confirmEmail}
              onChange={handleInputChange}
              required
              fullWidth
              id="confirmEmail"
              label="Confirm Email"
              error={!!formErrors.confirmEmail}
              helperText={formErrors.confirmEmail}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              name="bankName"
              value={formData.bankName}
              onChange={handleInputChange}
              required
              fullWidth
              id="bankName"
              label="Bank Name"
              error={!!formErrors.bankName}
              helperText={formErrors.bankName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleInputChange}
              required
              fullWidth
              id="accountNumber"
              label="Account Number"
              error={!!formErrors.accountNumber}
              helperText={formErrors.accountNumber}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
              fullWidth
              id="userName"
              label="User Name"
              error={!!formErrors.username}
              helperText={formErrors.username}
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required
              fullWidth
              id="phoneNumber"
              label="Phone Number"
              error={!!formErrors.phoneNumber}
              helperText={formErrors.phoneNumber}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              required
              fullWidth
              value={formData.password}
              onChange={handleInputChange}
              name="password"
              label="Password"
              type="password"
              id="password"
              error={!!formErrors.password}
              helperText={formErrors.password}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              required
              fullWidth
              value={formData.confirmPassword}
              onChange={handleInputChange}
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              error={!!formErrors.confirmPassword}
              helperText={formErrors.confirmPassword}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel control={<Checkbox value="allowExtraEmails" color="primary" />} label="I Accept terms and conditions." />
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, mb: 2 }}>
          <Button
            type="submit"
            variant="contained"
            sx={{ width: 'fit-content', px: 10, py: 1, borderRadius: '14px' }} // Adjust the width and padding
          >
            Sign Up
          </Button>
        </Box>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link href="#" variant="body2">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

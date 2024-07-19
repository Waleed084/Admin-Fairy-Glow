import * as React from 'react';
import { ThemeProvider, createTheme, CssBaseline, Container, Box } from '@mui/material';
import { ReactComponent as SignupSvg } from '../../../../assets/images/Sign-up.svg'; // Adjust the path accordingly
import SignUpForm from './SignUpForm'; // Adjust the path accordingly

// Custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#8e44ad' // Purple berry color
    }
  }
});

export default function SignUp() {
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth={false} disableGutters>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 0,
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'stretch',
            height: '100vh'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              marginTop: 4,
              flexDirection: 'column',
              alignItems: 'center',
              flexGrow: 1,
              width: '66.66%', // 2/3 screen space
              overflowY: 'auto',
              paddingX: { xs: 2, md: 6 }
            }}
          >
            <SignUpForm />
          </Box>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              flexGrow: 1,
              width: '33.33%', // 1/3 screen space
              bgcolor: '#8e44ad', // Violet color
              borderRadius: '40px 0 0 40px', // Left side rounded
              overflow: 'hidden',
              color: 'white',
              height: '100%'
            }}
          >
            <SignupSvg style={{ maxWidth: '100%', height: 'auto' }} />
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

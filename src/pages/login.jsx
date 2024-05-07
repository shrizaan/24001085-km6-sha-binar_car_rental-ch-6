import { Alert, Box, Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { login } from '../services/AuthService';
import { Link } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const { onLogin } = useAuth();
  const [err, setErr] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');

    try {
      const user = await login({ email, password });
      await onLogin(user.data);
      navigate('/');
    } catch (error) {
      setErr(true);
    }
  };
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        height: '100vh',
        gap: 4,
      }}
    >
      <Box
        component="img"
        src="/images/bcr-signin.png"
        sx={{
          width: '100%',
          height: '100%',
        }}
      ></Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          mr: 4,
        }}
      >
        <Typography align="center" mb={2} variant="h6" fontWeight={'bold'}>
          Welcome, Admin BCR
        </Typography>

        {err && (
          <Alert
            sx={{
              my: 3,
            }}
            severity="error"
          >
            Login failed.
          </Alert>
        )}

        <Box
          component={'form'}
          method="post"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            width: '100%',
          }}
          onSubmit={handleSubmit}
        >
          <TextField
            fullWidth
            InputLabelProps={{ shrink: true }}
            label="Email"
            variant="standard"
            name="email"
            type="email"
            required
          />
          <TextField
            fullWidth
            InputLabelProps={{ shrink: true }}
            label="Password"
            variant="standard"
            name="password"
            type="password"
            required
          />

          <Button type="submit" variant="contained">
            Login
          </Button>
          <Button component={Link} to="/register" variant="contained">
            Register
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

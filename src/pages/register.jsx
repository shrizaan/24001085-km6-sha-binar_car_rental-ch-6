import { Box, Button, TextField, Typography } from '@mui/material';
import { Form, Link, redirect } from 'react-router-dom';
import { register } from '../services/AuthService';

export async function registerAction({ request }) {
  const formData = await request.formData();
  formData.append('role', 'superadmin');
  const file = formData.get('image');
  if (file instanceof File) {
    const reader = new FileReader();
    reader.onload = function (event) {
      console.log(event.target.result); // This will be the file content
    };
    reader.readAsText(file); // or readAsDataURL(file) for binary files like images
  }

  await register(formData);

  return redirect('/login');
}

export default function Register() {
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
        <Typography align="center" my={4} variant="h6" fontWeight={'bold'}>
          Register Admin BCR
        </Typography>

        <Box
          component={Form}
          method="post"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            width: '100%',
          }}
          encType="multipart/form-data"
        >
          <TextField
            fullWidth
            InputLabelProps={{ shrink: true }}
            label="Name"
            variant="standard"
            name="name"
            required
          />
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
            label="Image"
            variant="standard"
            name="image"
            type="file"
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
            Submit
          </Button>
          <Button component={Link} to="/login" variant="contained">
            Login
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

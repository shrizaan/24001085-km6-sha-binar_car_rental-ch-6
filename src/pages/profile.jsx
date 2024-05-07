import { Box } from '@mui/material';
import { useAuth } from '../hooks/useAuth';

export default function Profile() {
  const { user } = useAuth();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        my: '4rem'
      }}
    >
      <Box sx={{
        width: '200px',
        height: '200px',
      }} component={'img'} src={user.image} />
      <Box>{user.name}</Box>
      <Box>{user.email}</Box>
    </Box>
  );
}

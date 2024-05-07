import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Grid, Typography } from '@mui/material';
import { Link as RouterLink, redirect, useLoaderData } from 'react-router-dom';
import CarCard from '../components/CarCard';
import { getToken } from '../services/AuthService';
import { deleteCar, getCars } from '../services/CarService';

export async function loader() {
  const token = getToken();
  const cars = await getCars(token);
  return { cars };
}

export async function deleteCarAction({ params }) {
  const token = getToken();
  await deleteCar(params.carId, token);
  return redirect(`/cars`);
}

export default function Car() {
  const { cars } = useLoaderData();

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mt: 2,
        }}
      >
        <Typography variant="h4">List Cars</Typography>
        <Button
          sx={{
            width: '200px',
            height: '50px',
          }}
          startIcon={<AddIcon />}
          variant="contained"
          to="add"
          component={RouterLink}
        >
          Add New Car
        </Button>
      </Box>

      <Box
        sx={{
          my: 4,
          display: 'flex',
          columnGap: 2,
        }}
        aria-label="Basic button group"
      >
        <Button variant="outlined">All</Button>
        <Button variant="outlined">Small</Button>
        <Button variant="outlined">Medium</Button>
        <Button variant="outlined">Large</Button>
      </Box>

      <Grid container spacing={5}>
        {cars.map((car) => (
          <Grid item key={car.id} xs={12} sm={6} md={4} lg={3}>
            <CarCard Car={car} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

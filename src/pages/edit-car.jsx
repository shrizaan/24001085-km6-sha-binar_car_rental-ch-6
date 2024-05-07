import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useRef, useState } from 'react';
import { redirect, useLoaderData } from 'react-router-dom';
import { getToken } from '../services/AuthService';
import { getCarById, updateCar } from '../services/CarService';

export async function loader({ params }) {
  const token = getToken();
  const car = await getCarById(params.carId, token);
  return { car };
}

export default function EditCar() {
  const { car: carData } = useLoaderData();
  const formRef = useRef();
  const [car, setCar] = useState(carData);
  const [carUpdates, setCarUpdates] = useState({});

  const [available, setAvailable] = useState(car.available);

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    const token = getToken();

    for (const key in carUpdates) {
      formData.set(key, carUpdates[key]);
    }

    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }

    const carId = carData.id;
    await updateCar(carId, formData, token);
    return redirect(`/cars`);
  }

  function handleCarChange(event) {
    if (event.target.name === 'image') {
      setCarUpdates({
        ...carUpdates,
        [event.target.name]: event.target.files[0],
      });
    } else if (event.target.name === 'available') {
      setCarUpdates({
        ...carUpdates,
        [event.target.name]: !available,
      });
    } else {
      setCarUpdates({ ...carUpdates, [event.target.name]: event.target.value });
    }
  }

  console.log(carUpdates);
  return (
    <Box>
      <Typography align="center" my={4} variant="h4">
        Edit Car
      </Typography>

      <form
        ref={formRef}
        method="post"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            width: '50%',
            mx: 'auto',
          }}
        >
          <TextField
            InputLabelProps={{ shrink: true }}
            id="car-id"
            label="ID"
            name="id"
            variant="standard"
            defaultValue={car.id}
            disabled
          />

          <TextField
            InputLabelProps={{ shrink: true }}
            id="car-plate"
            label="Plate"
            name="plate"
            variant="standard"
            defaultValue={car.plate}
            onChange={handleCarChange}
          />

          <TextField
            InputLabelProps={{ shrink: true }}
            id="car-name"
            label="Name"
            name="name"
            variant="standard"
            defaultValue={car.name}
            onChange={handleCarChange}
          />

          <TextField
            InputLabelProps={{ shrink: true }}
            id="car-year"
            label="Production Year"
            name="year"
            variant="standard"
            type="number"
            defaultValue={car.year}
            onChange={handleCarChange}
          />

          <TextField
            InputLabelProps={{ shrink: true }}
            id="car-image"
            label="Image"
            name="image"
            type="file"
            variant="standard"
            onChange={handleCarChange}
          />

          <TextField
            InputLabelProps={{ shrink: true }}
            id="car-rent-per-day"
            label="Rent Per Day"
            name="rentPerDay"
            variant="standard"
            type="number"
            defaultValue={car.rentPerDay}
            onChange={handleCarChange}
          />

          <TextField
            InputLabelProps={{ shrink: true }}
            id="car-capacity"
            label="Capacity"
            name="capacity"
            variant="standard"
            type="number"
            defaultValue={car.capacity}
            onChange={handleCarChange}
          />

          <TextField
            InputLabelProps={{ shrink: true }}
            id="car-transmission"
            label="Transmission"
            name="transmission"
            variant="standard"
            defaultValue={car.transmission}
            onChange={handleCarChange}
          />

          <TextField
            InputLabelProps={{ shrink: true }}
            id="car-available-at"
            label="Available At"
            name="availableAt"
            variant="standard"
            type="date"
            defaultValue={new Date(car.availableAt).toLocaleDateString('en-CA')}
            onChange={handleCarChange}
          />

          <Box
            sx={{
              display: 'flex',
              ml: 0,
            }}
          >
            <FormControlLabel
              value={available}
              checked={available}
              onClick={() => {
                setAvailable(!available);
              }}
              control={<Checkbox />}
              label="Available"
              labelPlacement="start"
              name="available"
              onChange={handleCarChange}
            />
          </Box>

          <FormControl fullWidth>
            <InputLabel id="car-size">Size</InputLabel>
            <Select
              labelId="car-size"
              id="car-size-select"
              label="Size"
              name="size"
              defaultValue={car.size}
              onChange={handleCarChange}
            >
              <MenuItem value={'small'}>Small</MenuItem>
              <MenuItem value={'medium'}>Medium</MenuItem>
              <MenuItem value={'large'}>Large</MenuItem>
            </Select>
          </FormControl>

          <TextField
            InputLabelProps={{ shrink: true }}
            id="car-type"
            label="Type"
            name="type"
            variant="standard"
            defaultValue={car.type}
            onChange={handleCarChange}
          />

          <TextField
            InputLabelProps={{ shrink: true }}
            id="car-brand"
            label="Brand"
            name="brand"
            variant="standard"
            defaultValue={car.brand}
            onChange={handleCarChange}
          />

          <TextField
            InputLabelProps={{ shrink: true }}
            id="car-description"
            label="Description"
            multiline
            rows={3}
            name="description"
            variant="standard"
            defaultValue={car.description}
            onChange={handleCarChange}
          />

          <Button
            sx={{
              my: 4,
            }}
            variant="contained"
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
}

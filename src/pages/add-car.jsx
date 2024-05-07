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
import { useState } from 'react';
import { Form, redirect } from 'react-router-dom';
import { getToken } from '../services/AuthService';
import { createCar } from '../services/CarService';

export async function action({ request, params }) {
  const formData = await request.formData();
  const token = getToken();
  const car = await createCar(formData, token);
  return redirect(`/cars`);
}

export default function AddCar() {
  const [available, setAvailable] = useState(false);
  return (
    <Box>
      <Typography align="center" my={4} variant="h4">
        Add New Car
      </Typography>

      <Form method="post" encType="multipart/form-data">
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
            id="car-plate"
            label="Plate"
            name="plate"
            variant="standard"
            required
          />

          <TextField
            InputLabelProps={{ shrink: true }}
            id="car-name"
            label="Name"
            name="name"
            variant="standard"
            required
          />

          <TextField
            InputLabelProps={{ shrink: true }}
            id="car-year"
            label="Production Year"
            name="year"
            variant="standard"
            type="number"
            required
          />

          <TextField
            InputLabelProps={{ shrink: true }}
            id="car-image"
            label="Image"
            name="image"
            type="file"
            variant="standard"
            required
          />

          <TextField
            InputLabelProps={{ shrink: true }}
            id="car-rent-per-day"
            label="Rent Per Day"
            name="rentPerDay"
            variant="standard"
            type="number"
            required
          />

          <TextField
            InputLabelProps={{ shrink: true }}
            id="car-capacity"
            label="Capacity"
            name="capacity"
            variant="standard"
            type="number"
            required
          />

          <TextField
            InputLabelProps={{ shrink: true }}
            id="car-transmission"
            label="Transmission"
            name="transmission"
            variant="standard"
            required
          />

          <TextField
            InputLabelProps={{ shrink: true }}
            id="car-available-at"
            label="Available At"
            name="availableAt"
            variant="standard"
            type="date"
            required
          />

          <Box
            sx={{
              display: 'flex',
              ml: 0,
            }}
          >
            <FormControlLabel
              value={available}
              onClick={() => {
                setAvailable(!available);
              }}
              control={<Checkbox />}
              label="Available"
              labelPlacement="start"
              name="available"
            />
          </Box>

          <FormControl fullWidth>
            <InputLabel id="car-size">Size</InputLabel>
            <Select
              labelId="car-size"
              id="car-size-select"
              label="Size"
              name="size"
              required
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
            required
          />

          <TextField
            InputLabelProps={{ shrink: true }}
            id="car-brand"
            label="Brand"
            name="brand"
            variant="standard"
            required
          />

          <TextField
            InputLabelProps={{ shrink: true }}
            id="car-description"
            label="Description"
            multiline
            rows={3}
            name="description"
            variant="standard"
            required
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
      </Form>
    </Box>
  );
}

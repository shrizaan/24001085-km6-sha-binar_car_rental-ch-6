import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CarRentalIcon from '@mui/icons-material/CarRental';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button, CardActions } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Form, Link } from 'react-router-dom';

export default function CarCard({ Car: car }) {
  return (
    <Card sx={{ maxWidth: 345, p: '24px' }}>
      <CardMedia
        component="img"
        height="240"
        image={car.image}
        alt={car.name}
        sx={{
          mb: 2,
          borderRadius: 1,
        }}
      />
      <CardContent
        sx={{
          p: 0,
          mb: 3,
        }}
      >
        <Typography mb={1} variant="body2" gutterBottom component="div">
          {car.brand} - {car.name}
        </Typography>
        <Typography
          fontWeight={'bold'}
          mb={2}
          gutterBottom
          variant="body1"
          component="div"
        >
          Rp. {car.rentPerDay} / hari
        </Typography>
        <Typography
          sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 2,
          }}
          variant="body2"
          color="text.secondary"
        >
          <CarRentalIcon
            sx={{
              mr: 1,
            }}
          />
          {car.available
            ? `Available at ${new Date(car.availableAt).toLocaleDateString(
                'id-ID',
                {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                },
              )}`
            : 'Not Available'}
          {/* {Car.startRentDate || 'Start Rent Date'} -{' '}
          {Car.endRentDate || 'End Rent Date'} */}
        </Typography>
        <Typography
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
          variant="body2"
          color="text.secondary"
        >
          <AccessTimeIcon
            sx={{
              mr: 1,
            }}
          />
          {`Updated at ${new Date(car.updated_at).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}` || 'Updated at 4 Apr 2022, 09.00'}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '12px',
          p: 0,
          '& > *': {
            flex: '1 1 0',
          },
        }}
      >
        <Form
          method="post"
          action={`${car.id}/delete`}
          onSubmit={(event) => {
            if (!confirm('Please confirm you want to delete this record.')) {
              event.preventDefault();
            }
          }}
        >
          <Button
            sx={{
              width: '100%',
            }}
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            type="submit"
          >
            Delete
          </Button>
        </Form>
        <Button
          component={Link}
          to={`/cars/${car.id}/edit`}
          sx={{
            marginLeft: '0px !important',
          }}
          variant="contained"
          color="success"
          startIcon={<EditIcon />}
        >
          Edit
        </Button>
      </CardActions>
    </Card>
  );
}

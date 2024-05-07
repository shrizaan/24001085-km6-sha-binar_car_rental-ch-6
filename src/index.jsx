import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import CssBaseline from '@mui/material/CssBaseline';

import ProtectedRoute from './components/ProtectedRoute';
import AddCar, { action as addCarAction } from './pages/add-car';
import Car, { loader as carsLoader, deleteCarAction } from './pages/car';
import CarBrand from './pages/car-brand';
import CarCategory from './pages/car-category';
import Dashboard from './pages/dashboard';
import ErrorPage from './pages/error-page';
import Login from './pages/login';
import Register, { registerAction } from './pages/register';
import Root from './pages/root';

import { CheckLogin } from './components/CheckLogin';
import { AuthProvider } from './hooks/useAuth';
import EditCar, { loader as editCarLoader } from './pages/edit-car';
import Profile from './pages/profile';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Root />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: '/cars',
            element: <Car />,
            loader: carsLoader,
          },
          {
            path: '/cars/add',
            element: <AddCar />,
            action: addCarAction,
          },
          {
            path: '/cars/:carId/edit',
            element: <EditCar />,
            loader: editCarLoader,
          },
          {
            path: '/cars/:carId/delete',
            action: deleteCarAction,
          },
          {
            path: '/car-brands',
            element: <CarBrand />,
          },
          {
            path: '/car-categories',
            element: <CarCategory />,
          },
          {
            path: '/profile',
            element: <Profile />,
          },
        ],
      },
    ],
  },
  {
    element: <CheckLogin />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
        action: registerAction,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CssBaseline />
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
);

import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export async function getCars(token) {
  const {
    data: { data },
  } = await axios.get(`${API_URL}/cars`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}

export async function getCarById(id, token) {
  const {
    data: { data },
  } = await axios.get(`${API_URL}/cars/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}

export async function createCar(carFormData, token) {
  const response = await axios.post(`${API_URL}/cars`, carFormData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
}

export async function updateCar(carId, carFormData, token) {
  const { data } = await axios.patch(`${API_URL}/cars/${carId}`, carFormData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
}

export async function deleteCar(id, token) {
  await axios.delete(`${API_URL}/cars/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

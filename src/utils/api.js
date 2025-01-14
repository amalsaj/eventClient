import axios from "axios";

const API_URL = "https://eventserver-sfrb.onrender.com/api/v1";

// Register User
export const registerUser = (userData) => {
  return axios.post(`${API_URL}/auth/signup`, userData);
};

// Login User
export const loginUser = (formData) => {
  return axios.post(`${API_URL}/auth/login`, formData);
};

// Fetch All events
export const getAllEvents = () => {
  return axios.get(`${API_URL}/event/getAllEvents`);
};

// Fetch All events by Id
export const getEventById = (eventId) => {
  const token = localStorage.getItem("token");
  return axios.get(`${API_URL}/event/getEventById`, {
    headers: { Authorization: `Bearer ${token}` },
    params: { eventId },
  });
};

// Create Task
export const createEvent = (eventData) => {
  const token = localStorage.getItem("token");
  return axios.post(`${API_URL}/event/createEvent`, eventData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Update Task
export const updateEvent = (eventId, updatedData) => {
  const token = localStorage.getItem("token");
  return axios.put(`${API_URL}/event/updateEvent`, updatedData, {
    headers: { Authorization: `Bearer ${token}` },
    params: { eventId },
  });
};

// Delete Task
export const deleteEvent = (eventId) => {
  const token = localStorage.getItem("token");
  return axios.delete(`${API_URL}/event/deleteEvent`, {
    headers: { Authorization: `Bearer ${token}` },
    params: { eventId },
  });
};

export const addAttendee = (eventId) => {
  const token = localStorage.getItem("token");
  return axios.post(
    `${API_URL}/event/addAttendee`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
      params: { eventId },
    }
  );
};

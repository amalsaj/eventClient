import axios from "axios";

const API_URL = "https://eventserver-sfrb.onrender.com/api/v1";
const token = localStorage.getItem("token");

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
  return axios.get(`${API_URL}/event/getAllEvents`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Fetch All events by Id
export const getEventById = (eventId) => {
  return axios.get(`${API_URL}/event/getEventById`, {
    headers: { Authorization: `Bearer ${token}` },
    params: { eventId },
  });
};

// Create Task
export const createEvent = (eventData) => {
  return axios.post(`${API_URL}/event/createEvent`, eventData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Update Task
export const updateEvent = (eventId, updatedData) => {
  return axios.put(`${API_URL}/event/updateEvent`, updatedData, {
    headers: { Authorization: `Bearer ${token}` },
    params: { eventId },
  });
};

// Delete Task
export const deleteEvent = (eventId) => {
  return axios.delete(`${API_URL}/event/deleteEvent`, {
    headers: { Authorization: `Bearer ${token}` },
    params: { eventId },
  });
};

export const addAttendee = (eventId) => {
  return axios.post(
    `${API_URL}/event/addAttendee`, 
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
      params: { eventId },
    }
  );
};


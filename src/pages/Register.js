import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../utils/api";
import { toast } from 'react-toastify';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      toast.success("Account Created Successfully 🎉")
      navigate("/");
    } catch (error) {
      const errorMessage = error.response?.data?.error || "An error occurred";
      toast.error(`${errorMessage}`)
      setError(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Register</h1>
      {error && <div className="text-red-500 text-sm mb-4 text-center">{error}</div>}
      <form onSubmit={handleRegister}>
        <div className="mb-6">
          <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-2">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Register
        </button>
      </form>
      <p className="text-sm mt-4 text-center text-gray-600">
        Already have an account?{" "}
        <Link to="/" className="text-blue-600 hover:underline">
          Login
        </Link>
      </p>
    </div>
  </div>  
  );
};

export default RegisterPage;

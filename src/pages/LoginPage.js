import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../utils/api";
import { toast } from 'react-toastify';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await loginUser(formData);
      setIsLoading(false);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("id", response.data.user._id);
      localStorage.setItem("role", "user");
      toast.success("Login Successfully 🎉")
      navigate("/home");
    } catch (error) {
      setIsLoading(false);
      if (error.response && error.response.data) {
        toast.error(`${error.response.data.error}`)
        setError(error.response.data.error || "An error occurred.");
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  const handleGuestLogin = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    toast.success("Login Successfully as Guest 🎉")
    navigate("/home");
    localStorage.setItem("role", "guest");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Login
        </h1>
        {error && (
          <div className="text-red-500 text-sm mb-4 text-center">{error}</div>
        )}
        <form onSubmit={handleLogin}>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
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
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
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
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        <button
          onClick={handleGuestLogin}
          className="w-full mt-4 bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-800"
        >
          Continue as Guest
        </button>
        <p className="text-sm mt-4 text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

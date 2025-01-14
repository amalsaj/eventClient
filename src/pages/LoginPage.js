import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../utils/api";

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
      console.log("Token saved:", localStorage.getItem("token"));
      navigate("/home");
    } catch (error) {
      setIsLoading(false);
      if (error.response && error.response.data) {
        setError(error.response.data.error || "An error occurred.");
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  const handleGuestLogin = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    navigate("/home");
    localStorage.setItem("role", "guest");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="w-full px-3 py-2 border rounded"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-2"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="w-full px-3 py-2 border rounded"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        <button
          onClick={handleGuestLogin}
          className="w-full mt-4 bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
        >
          Continue as Guest
        </button>
        <p className="text-sm mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

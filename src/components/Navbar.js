import React, { useState, useEffect } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom"; 
import socket from "../utils/socket";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const Navbar = ({ onSearch }) => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  // State to manage notifications
  const [notifications, setNotifications] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); 

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    navigate("/");
  };

  // Function to handle new notifications
  const notification = (message) => {
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      { id: Date.now(), message, read: false },
    ]);
  };

  useEffect(() => {
    socket.on("attendeeUpdated", () => {
      notification("new user joined an event");
    });

    return () => {
      socket.off("attendeeUpdated");
    };
  }, []);

  const handleNotificationClick = () => {
    setIsPopupVisible(!isPopupVisible);
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  // Calculate unread notification count
  const unreadCount = notifications.filter((notif) => !notif.read).length;

  return (
    <nav className="bg-white shadow-md py-4">
      <div className="container mx-auto flex items-center justify-between px-6">
        {/* Logo Section */}
        <div className="flex items-center space-x-4">
          <img
            src="/assets/images/logo.webp"
            alt="Eventify Logo"
            className="h-10 w-10 rounded-full"
          />
          <h1 className="text-3xl font-bold text-gray-900">Eventify</h1>
        </div>

        {/* Desktop Search Bar */}
        <div className="max-sm:hidden md:flex-1 mx-8 max-w-lg">
          <input
            type="text"
            placeholder="Search events..."
            className="w-full px-6 py-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>

        {role === "user" && (
          <div className="flex items-center space-x-8">
            <button
              onClick={handleNotificationClick}
              className="relative text-lg font-medium text-gray-800 hover:text-blue-600 transition duration-300"
            >
              <IoMdNotificationsOutline />
              {unreadCount > 0 && (
                <span className="absolute -top-2 right-1 w-6 h-6 bg-red-600 text-white text-xs rounded-full flex items-center justify-center font-bold animate-bounce">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Desktop Menu (Dashboard, Logout) */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                to="/dashboard"
                className="text-lg font-medium text-gray-800 hover:text-blue-600 transition duration-300"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="text-lg font-medium text-gray-800 hover:text-blue-600 transition duration-300"
              >
                Logout
              </button>
            </div>
          </div>
        )}

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden flex items-center space-x-4">
          {/* Hamburger Menu for Mobile */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-2xl text-gray-800 focus:outline-none"
          >
            {isMenuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-20  right-0 w-full bg-white shadow-lg rounded-lg border border-gray-200 z-50 px-6 py-4">
          {/* Search Bar in Mobile View */}
          <input
            type="text"
            placeholder="Search events..."
            className="w-full px-6 py-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
            onChange={(e) => onSearch(e.target.value)}
          />

          {role === "user" && (
            <div className="space-y-4">
              <Link
                to="/dashboard"
                className="block text-lg font-medium text-gray-800 hover:text-blue-600 transition duration-300"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="block text-lg font-medium text-gray-800 hover:text-blue-600 transition duration-300"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}

      {/* Notification Pop-up */}
      {isPopupVisible && (
        <div className="absolute right-0 mt-12  lg:mt-0 w-40 p-4 bg-white shadow-lg rounded-lg border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900">
            Notifications
          </h3>
          <ul className="mt-2">
            {notifications.length === 0 ? (
              <li className="text-gray-600">No new notifications</li>
            ) : (
              notifications.map((notification) => (
                <li
                  key={notification.id}
                  className={`py-2 text-gray-800 ${
                    notification.read ? "opacity-60" : "font-bold"
                  }`}
                >
                  {notification.message}
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

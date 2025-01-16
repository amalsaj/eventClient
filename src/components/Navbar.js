import React, { useState, useEffect } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import socket from "../utils/socket";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { enqueueSnackbar } from "notistack";

const Navbar = ({ onSearch, events }) => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const userId = localStorage.getItem("id");
  const [eventId, seteventId] = useState();
  const [notifications, setNotifications] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    enqueueSnackbar("Logout Successfully 🎉", {
      variant: "success",
    });
    navigate("/");
  };

  const notification = (eventId) => {
    const event = events.find((event) => event._id === eventId);
    if (event && event.createdBy._id === userId) {
      const eventMessage = `A new user has joined the "${event.name}" event.`;
      console.log("eventMessage: ", eventMessage);
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        { id: Date.now(), message: eventMessage, read: false },
      ]);
      console.log(notifications);
    }
  };

  useEffect(() => {
    socket.on("attendeeUpdated", (data) => {
      seteventId(data.eventId);
      notification(data.eventId);
    });

    return () => {
      socket.off("attendeeUpdated");
    };
  }, [events]);

  const handleNotificationClick = () => {
    setIsPopupVisible(!isPopupVisible);
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

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

      {/* Notification Popup */}
      {isPopupVisible && (
        <div className="absolute right-0 mt-12 lg:mt-0 w-72 max-w-sm p-4 bg-white shadow-lg rounded-lg border border-gray-200 z-50 transition-transform transform scale-100 hover:scale-105">
          <h3 className="text-xl font-semibold text-gray-900 border-b pb-2 mb-3">
            Notifications
          </h3>
          <ul className="space-y-2">
            {notifications.length === 0 ? (
              <li className="text-gray-500 text-center">
                No new notifications
              </li>
            ) : (
              notifications.map((notification) => (
                <li
                  key={notification.id}
                  className={`flex items-start p-3 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 transition-all duration-200 ${
                    notification.read ? "opacity-60" : "font-medium"
                  }`}
                >
                  <div className="flex-shrink-0 mr-3">
                    <span className="text-blue-600">
                      <IoMdNotificationsOutline className="text-lg" />
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-800">
                      {notification.message}
                    </p>
                    <span className="text-xs text-gray-400 block mt-1">
                      {new Date().toLocaleString()}
                    </span>
                  </div>
                </li>
              ))
            )}
          </ul>
          {notifications.length > 0 && (
            <div className="mt-3 text-center">
              <button
                onClick={() => setNotifications([])} // Clear all notifications
                className="text-red-600 hover:text-red-800 font-semibold text-sm"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

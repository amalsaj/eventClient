import React, { useEffect, useState } from "react";
import {getEventById } from "../utils/api";
import socket from "../utils/socket";
import { useNavigate } from "react-router-dom";

const AttendeeList = () => {
  const [attendees, setAttendees] = useState([]);
  const [events, setEvent] = useState([]);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllEvents();
  }, []);

  const fetchAllEvents = async () => {
    try {
      const response = await getEventById();
      const data = response.data.data;
      setEvent(data);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message === "token expired") {
        navigate("/");
      } else {
        console.error("Error fetching events:", error);
      }
    }
  };

  const handleView = async (data) => {
    try {
      setAttendees(data);
      setError(null);
      setShowModal(true);
    } catch (err) {
      setError("Failed to fetch attendees. Please try again.");
    }
  };

  socket.on("attendeeUpdated", () => {
    fetchAllEvents();
  });
  

  const closeModal = () => {
    setShowModal(false); 
    setError(null);
  };

  return (
    <div className="p-6">
    {events.length === 0 ? (
      <p className="text-gray-600 text-center text-lg font-semibold">
        No events available to display attendees.
      </p>
    ) : (
      <div className="overflow-x-auto shadow-xl rounded-lg bg-white">
        <table className="min-w-full table-auto text-sm text-gray-700">
          <thead>
            <tr className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
              <th className="px-6 py-4 text-left font-semibold">Event Name</th>
              <th className="px-6 py-4 text-left font-semibold">Attendee Count</th>
              <th className="px-6 py-4 text-left font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr
                key={event._id}
                className="hover:bg-blue-50 transition duration-150"
              >
                <td className="px-6 py-4">{event.name}</td>
                <td className="px-6 py-4">{event.attendees.length}</td>
                <td className="px-6 py-4">
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
                    onClick={() => handleView(event.attendees)}
                  >
                    View Attendees
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  
    {/* Modal */}
    {showModal && (
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
        <div className="bg-white w-11/12 max-w-lg rounded-lg shadow-2xl p-6 relative">
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600 transition"
          >
            ✕
          </button>
          <h2 className="text-xl font-semibold text-blue-700 mb-4">
            Attendees List
          </h2>
          {error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : attendees.length > 0 ? (
            <ul className="space-y-2">
              {attendees.map((attendee) => (
                <li
                  key={attendee._id}
                  className="px-4 py-2 bg-gray-100 rounded-lg shadow hover:bg-gray-200 transition"
                >
                  {attendee.email}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 text-center">No attendees found.</p>
          )}
        </div>
      </div>
    )}
  </div>
  
  );
};

export default AttendeeList;

import React, { useEffect, useState } from "react";
import {getEventById } from "../utils/api";
import socket from "../utils/socket";

const AttendeeList = () => {
  const [attendees, setAttendees] = useState([]);
  const [events, setEvent] = useState([]);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchAllEvents();
  }, []);

  const fetchAllEvents = async () => {
    try {
      const response = await getEventById();
      const data = response.data.data;
      setEvent(data);
    } catch (error) {
      console.error("Error fetching events:", error);
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
    setShowModal(false); // Close the modal
    setError(null); // Clear error if present
  };

  return (
    <div className="p-6">
      {events.length === 0 ? (
        <p className="text-gray-600 text-center text-lg">
          No events available to display attendees.
        </p>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
          <table className="min-w-full table-auto text-sm text-gray-700">
            <thead>
              <tr className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <th className="px-6 py-4 text-left font-semibold">
                  Event Name
                </th>
                <th className="px-6 py-4 text-left font-semibold">
                  Attendee Count
                </th>
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
                      className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition"
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-11/12 max-w-lg rounded-lg shadow-lg p-6 relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600 transition"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold text-blue-600 mb-4">
              Attendees List
            </h2>
            {error ? (
              <p className="text-red-500">{error}</p>
            ) : attendees.length > 0 ? (
              <ul className="space-y-2">
                {attendees.map((attendee) => (
                  <li
                    key={attendee._id}
                    className="px-4 py-2 bg-gray-100 rounded shadow hover:bg-gray-200 transition"
                  >
                    {attendee.email}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No attendees found.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendeeList;

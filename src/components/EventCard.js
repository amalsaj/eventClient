import React from "react";
import { addAttendee } from "../utils/api";
import { MdPeople } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const EventCard = ({ event }) => {
  const navigate = useNavigate();
  const { _id, name, description, date, attendees, category, image } = event;
  const userId = localStorage.getItem("id");
  const role = localStorage.getItem("role");
  const isAttending = attendees.some((attendee) => attendee._id === userId);

  const handleAttend = async () => {
    try {
      if (role === "user") {
        await addAttendee(_id);
      } else if (role === "guest") {
        navigate("/");
      }
    } catch (error) {
      console.error("Error joining event:", error);
    }
  };

  return (
    <div className="bg-white border rounded-lg shadow hover:shadow-lg transition-shadow duration-300 ease-in-out">
      <div className="relative rounded-t-lg overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-40 object-cover hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-medium px-3 py-1 rounded-full">
          {category}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-800 mb-2">{name}</h3>
        <p className="text-sm text-gray-600 line-clamp-2 mb-4">{description}</p>

        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <span>{new Date(date).toLocaleDateString()}</span>
          <span className="flex items-center">
            <MdPeople size={16} className="mr-1 text-teal-500" />
            {attendees.length}
          </span>
        </div>
        <button
          className={`w-full text-sm font-medium py-2 rounded-md transition ${
            isAttending
              ? "bg-gray-300 text-gray-700 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
          onClick={handleAttend}
          disabled={isAttending}
        >
          {isAttending ? "Joined" : "Join Event"}
        </button>
      </div>
    </div>
  );
};

export default EventCard;

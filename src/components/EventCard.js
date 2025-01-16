import React, { useState } from "react";
import { addAttendee } from "../utils/api";
import { MdPeople } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

const EventCard = ({ event }) => {
  const navigate = useNavigate();
  const {
    _id,
    name,
    description,
    date,
    attendees: initialAttendees,
    category,
    image,
  } = event;
  const userId = localStorage.getItem("id");
  const role = localStorage.getItem("role");
  const [attendees, setAttendees] = useState(initialAttendees);
  const isAttending = attendees.some((attendee) => attendee._id === userId);

  const handleAttend = async () => {
    try {
      if (role === "user") {
        await addAttendee(_id);
        setAttendees((prev) => [...prev, { _id: userId }]);
        enqueueSnackbar(`You Joined the ${name} event 🎉`, {
          variant: "success",
        });
      } else if (role === "guest") {
        enqueueSnackbar("Please log in to join the event! 👾", {
          variant: "info",
        });
        navigate("/");
      }
    } catch (error) {
      enqueueSnackbar(`${error}`, {
        variant: "error",
      });
      console.error("Error joining event:", error);
    }
  };

  return (
    <div className="bg-white border rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
    <div className="relative rounded-t-lg overflow-hidden">
      <img
        src={image}
        alt={name}
        className="w-full h-40 object-cover hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute bottom-4 left-2 bg-gray-900 text-white text-xs font-medium px-3 py-1 rounded-full">
        {new Date(date).toLocaleDateString("en-GB", {
          weekday: "long",
          day: "2-digit",
          month: "short",
          year: "numeric",
        })}
      </div>
    </div>
    <div className="p-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{name}</h3>
      <p className="text-sm text-gray-600 line-clamp-2 mb-4">{description}</p>
  
      <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
        <div className="flex items-center">
          <MdPeople size={16} className="mr-1 text-teal-500" />
          {attendees.length}
        </div>
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

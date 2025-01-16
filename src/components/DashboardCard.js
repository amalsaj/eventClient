import React from "react";
import { MdPeople } from "react-icons/md";

const EventList = ({ events, onDelete, onEdit }) => {
  return (
    <section className="bg-gray-50 py-12">
    <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {events && events.length > 0 ? (
        events.map((event) => (
          <div
            key={event._id}
            className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105"
          >
            <img
              src={event.image}
              alt={event.name}
              className="w-full h-48 object-cover rounded-t-xl"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{event.name}</h3>
              <p className="text-sm text-gray-600 line-clamp-3 mb-4">{event.description}</p>
              <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                <span>
                  {new Date(event.date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
                <span className="flex items-center text-teal-500">
                  <MdPeople size={16} className="mr-1" />
                  {event.attendees.length}
                </span>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => onEdit(event)}
                  className="px-4 py-2 bg-yellow-500 text-white text-sm font-medium rounded-full hover:bg-yellow-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(event._id)}
                  className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-full hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-16 col-span-full">
          <h2 className="text-lg font-semibold text-gray-600">No Events Found</h2>
          <p className="text-sm text-gray-500">
            Explore other categories or create your own event.
          </p>
        </div>
      )}
    </div>
  </section>
  
  );
};

export default EventList;

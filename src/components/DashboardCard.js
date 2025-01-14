import React from "react";

const EventList = ({ events, onDelete, onEdit }) => {
  return (
    <section className="bg-gray-50 py-8">
      <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events && events.length > 0 ? (
          events.map((event) => (
            <div
              key={event._id}
              className="bg-white rounded-md shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={event.image}
                alt={event.name}
                className="w-full h-40 object-cover rounded-t-md"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 truncate">
                  {event.name}
                </h3>
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                  {event.description}
                </p>
                <p className="text-xs text-gray-500 mt-3">
                  {new Date(event.date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
                <div className="mt-4 flex space-x-3">
                  <button
                    onClick={() => onEdit(event)}
                    className="px-3 py-1 bg-yellow-400 text-white text-xs font-medium rounded hover:bg-yellow-500 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(event._id)}
                    className="px-3 py-1 bg-red-500 text-white text-xs font-medium rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10 col-span-full">
            <h2 className="text-lg font-medium text-gray-600">No Events Found</h2>
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

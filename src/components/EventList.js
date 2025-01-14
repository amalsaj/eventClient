import React from "react";
import EventCard from "./EventCard";
import Loader from "./Loader";

const EventList = ({ events = [], isLoading }) => {
  return (
    <section className="bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {isLoading ? (
          <Loader />
        ) : events.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <h2 className="text-xl font-semibold text-gray-600">
              No Events Found
            </h2>
            <p className="text-gray-500">
              Explore other categories or create your own event.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default EventList;

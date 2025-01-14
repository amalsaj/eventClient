import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import EventList from "../components/EventList";
import { getAllEvents } from "../utils/api";
import socket from "../utils/socket";

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [events, setEvents] = useState([]);
  const listen = [
    "eventCreated",
    "eventDeleted",
    "eventUpdated",
    "attendeeUpdated",
  ];

  useEffect(() => {
    fetchAllEvents();
  }, []);

  const fetchAllEvents = async () => {
    try {
      const response = await getAllEvents();
      const data = response.data.data;
      setEvents(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  // Listen for all events dynamically
  listen.forEach((eventType) => {
    socket.on(eventType, () => {
      fetchAllEvents();
    });
  });

  const filteredEvents = events.filter((event) => {
    const matchesCategory =
      selectedCategory === "All" || event.category === selectedCategory;

    const eventDate = new Date(event.date);
    const startDate = new Date(selectedStartDate);
    const endDate = new Date(selectedEndDate);

    const matchesDate =
      (!selectedStartDate && !selectedEndDate) ||
      (eventDate >= startDate && eventDate <= endDate);

    const matchesSearch = event.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesCategory && matchesDate && matchesSearch;
  });

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar onSearch={handleSearch} />
      <main className="container mx-auto py-10 px-4">
  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
    {/* Filter Section */}
    <div className="col-span-1  bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">
        Filters
      </h3>
      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-medium mb-2"
          htmlFor="category"
        >
          Category
        </label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
        >
          <option value="All">All Categories</option>
          <option value="conference">Conference</option>
                <option value="webinar">Webinar</option>
                <option value="workshop">Workshop</option>
                <option value="meetup">Meetup</option>
                <option value="seminar">Seminar</option>
                <option value="training">Training</option>
                <option value="panel">Panel Discussion</option>
                <option value="hackathon">Hackathon</option>
                <option value="networking">Networking Event</option>
                <option value="symposium">Symposium</option>
                <option value="lecture">Lecture</option>
                <option value="expo">Expo</option>
                <option value="festival">Festival</option>
                <option value="product-launch">Product Launch</option>
                <option value="fundraiser">Fundraiser</option>
                <option value="gala">Gala</option>
                <option value="trade-show">Trade Show</option>
                <option value="roundtable">Roundtable</option>
                <option value="retreat">Retreat</option>
                <option value="summit">Summit</option>
                <option value="career-fair">Career Fair</option>
                <option value="community-meeting">Community Meeting</option>
                <option value="convention">Convention</option>
                <option value="award-ceremony">Award Ceremony</option>
                <option value="launch-event">Launch Event</option>
                <option value="celebration">Celebration</option>
                <option value="panel-discussion">Panel Discussion</option>
                <option value="concert">Concert</option>
                <option value="open-house">Open House</option>
                <option value="job-fair">Job Fair</option>
                <option value="sports-event">Sports Event</option>
                <option value="charity-event">Charity Event</option>
                <option value="product-demo">Product Demo</option>
                <option value="book-signing">Book Signing</option>
                <option value="press-conference">Press Conference</option>
                <option value="town-hall">Town Hall</option>
                <option value="retail-event">Retail Event</option>
                <option value="pop-up-shop">Pop-up Shop</option>
                <option value="meet-and-greet">Meet and Greet</option>
                <option value="social-event">Social Event</option>
                <option value="team-building">Team Building</option>
                <option value="fitness-event">Fitness Event</option>
                <option value="gaming-event">Gaming Event</option>
                <option value="fundraising-gala">Fundraising Gala</option>
                <option value="food-festival">Food Festival</option>
                <option value="fashion-show">Fashion Show</option>
                <option value="art-exhibit">Art Exhibit</option>
                <option value="science-fair">Science Fair</option>
                <option value="book-fair">Book Fair</option>
                <option value="theater-performance">Theater Performance</option>
                <option value="dance-event">Dance Event</option>
                <option value="music-festival">Music Festival</option>
                <option value="live-music">Live Music</option>
                <option value="open-mic">Open Mic</option>
                <option value="music-concert">Music Concert</option>
                <option value="dj-performance">DJ Performance</option>
                <option value="opera">Opera</option>
                <option value="classical-concert">Classical Concert</option>
                <option value="music-workshop">Music Workshop</option>
                <option value="singing-competition">Singing Competition</option>
                <option value="band-performance">Band Performance</option>
                <option value="sound-healing">Sound Healing</option>
                <option value="music-award-show">Music Award Show</option>
        </select>
      </div>
      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-medium mb-2"
          htmlFor="date"
        >
          Date Range
        </label>
        <div className="flex flex-col lg:gap-9">
          <input
            type="date"
            id="start-date"
            value={selectedStartDate}
            onChange={(e) => setSelectedStartDate(e.target.value)}
            className="w-full mb-4 lg:mb-0 px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
          />
          <input
            type="date"
            id="end-date"
            value={selectedEndDate}
            onChange={(e) => setSelectedEndDate(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
          />
        </div>
      </div>
    </div>

    {/* Event List Section */}
    <div className="col-span-2 lg:col-span-3">
      <h2 className="text-3xl font-semibold text-gray-900 mb-6">
        Upcoming Events
      </h2>
      <EventList events={filteredEvents} isLoading={isLoading} />
    </div>
  </div>
</main>

    </div>
  );
};

export default HomePage;

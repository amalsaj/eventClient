import React, { useState, useEffect } from "react";

const Modal = ({ isOpen, onClose, onSubmit, eventData = null, title }) => {
  console.log("eventData: ", eventData);
  const [eventDetails, setEventDetails] = useState({
    _id: "",
    name: "",
    description: "",
    date: "",
    time: "",
    location: "",
    category: "",
    image: null,
  });

  useEffect(() => {
    if (eventData) {
      const eventDate = new Date(eventData.date);
      const formattedDate = eventDate.toISOString().split("T")[0]; 
      setEventDetails({
        _id: eventData._id,
        name: eventData.name,
        description: eventData.description,
        date: formattedDate,
        time: eventData.time,
        location: eventData.location,
        category: eventData.category || "",
        image: eventData.image || null,
      });
    }
  }, [eventData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventDetails({ ...eventDetails, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0]; 

    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result;
      setEventDetails({ ...eventDetails, image: base64String });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(eventDetails);

  };

  return (
    <div
      className={`fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white rounded-lg w-96 p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">{title}</h2>
          <form onSubmit={handleFormSubmit}>
            {/* Event Name */}
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700">
                Event Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={eventDetails.name}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
            </div>

            {/* Description */}
            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={eventDetails.description}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 rounded"
                required
              ></textarea>
            </div>

            {/* Date */}
            <div className="mb-4">
              <label htmlFor="date" className="block text-gray-700">
                Event Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={eventDetails.date}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
            </div>

            {/* Time */}
            <div className="mb-4">
              <label htmlFor="time" className="block text-gray-700">
                Event Time
              </label>
              <input
                type="time"
                id="time"
                name="time"
                value={eventDetails.time}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
            </div>

            {/* Location */}
            <div className="mb-4">
              <label htmlFor="location" className="block text-gray-700">
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={eventDetails.location}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
            </div>

            {/* Category */}
            <div className="mb-4">
              <label htmlFor="category" className="block text-gray-700">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={eventDetails.category}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 rounded"
                required
              >
                <option value="">Select Category</option>
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

            {/* Image Upload */}
            <div className="mb-4">
              <label htmlFor="image" className="block text-gray-700">
                Event Image
              </label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleFileChange}
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                {eventData ? "Update Event" : "Create Event"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;

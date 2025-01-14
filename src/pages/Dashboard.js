import React, { useEffect, useState } from "react";
import EventList from "../components/DashboardCard";
import { getEventById, updateEvent, deleteEvent, createEvent } from "../utils/api";
import Modal from "../components/Modal";
import AttendeeList from "../components/AttendeeDetails";

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("create");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    fetchAllEvents();
  }, []);

  const fetchAllEvents = async () => {
    try {
      const response = await getEventById();
      const data = response.data.data;
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleEdit = (event) => {
    setSelectedEvent(event);
    setModalType("edit");
    setIsModalOpen(true);
  };

  const handleDelete = async (eventId) => {
    try {
      await deleteEvent(eventId);
      fetchAllEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const handleCreate = () => {
    setSelectedEvent(null);
    setModalType("create");
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalSubmit = async (eventDetails) => {
    try {
      if (modalType === "create") {
        await createEvent(eventDetails);
      } else {
        await updateEvent(selectedEvent._id, eventDetails);
      }
      fetchAllEvents();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error submitting event:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside
  className={`fixed inset-y-0 left-0 z-40 w-64 bg-blue-800 text-white transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
  }`}
>
  <div className="flex justify-between items-center p-4 md:hidden">
    <h2 className="text-xl font-semibold">Eventify</h2>
    <button
      className="text-white"
      onClick={() => setIsSidebarOpen(false)}
    >
      ✕
    </button>
  </div>
  <h2 className="text-xl font-semibold p-6 hidden md:block">Eventify</h2>
  <nav className="flex flex-col space-y-4 px-6">
    <button
      className={`text-left px-4 py-2 rounded ${
        activeTab === "dashboard" ? "bg-blue-700" : "hover:bg-blue-700"
      }`}
      onClick={() => {
        setActiveTab("dashboard");
        setIsSidebarOpen(false);
      }}
    >
      Dashboard
    </button>
    <button
      className={`text-left px-4 py-2 rounded ${
        activeTab === "attendees" ? "bg-blue-700" : "hover:bg-blue-700"
      }`}
      onClick={() => {
        setActiveTab("attendees");
        setIsSidebarOpen(false);
      }}
    >
      Attendees
    </button>
  </nav>
</aside>


      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8">
  {/* Sidebar Toggle Button for Small Screens */}
  <button
    className="bg-blue-500 text-white px-3 py-2 rounded md:hidden"
    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
  >
    ☰
  </button>

  {/* Tab Content */}
  {activeTab === "dashboard" && (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">
          Dashboard
        </h1>
        <button
          onClick={handleCreate}
          className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 transition"
        >
          Create New Event
        </button>
      </div>
      <EventList
        events={events}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  )}

  {activeTab === "attendees" && (
    <div>
      <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">
        Attendees
      </h1>
      <AttendeeList events={events} />
    </div>
  )}
</main>


      {/* Modal for Create and Edit Events */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onSubmit={handleModalSubmit}
          eventData={selectedEvent}
          title={modalType === "create" ? "Create Event" : "Edit Event"}
        />
      )}
    </div>
  );
};

export default DashboardPage;

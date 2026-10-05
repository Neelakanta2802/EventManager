import React, { useEffect, useState } from "react";
import axios from "axios";

function EventRegistrations() {

    const API_URL = "http://localhost:3000/registrations";
    const EVENT_URL = "http://localhost:3000/events";

    const [registrations, setRegistrations] = useState([]);
    const [events, setEvents] = useState([]);

    const [searchText, setSearchText] = useState("");
    const [selectedEvent, setSelectedEvent] = useState("All");

    const [error, setError] = useState("");

    // Get Registrations
    const getRegistrations = async () => {
        try {
            const response = await axios.get(API_URL);
            setRegistrations(response.data);
        } catch (error) {
            console.log(error);
            setError("Failed to fetch registrations");
        }
    };

    // Get Events
    const getEvents = async () => {
        try {
            const response = await axios.get(EVENT_URL);
            setEvents(response.data);
        } catch (error) {
            console.log(error);
            setError("Failed to fetch events");
        }
    };

    useEffect(() => {
        getRegistrations();
        getEvents();
    }, []);

    // Update Status
    const handleStatusChange = async (id, status) => {
        try {
            const response = await axios.put(
                `${API_URL}/${id}`,
                {
                    Status: status
                }
            );

            setRegistrations(
                registrations.map((registration) =>
                    registration._id === id
                        ? response.data
                        : registration
                )
            );

        } catch (error) {
            console.log(error);
            setError("Failed to update status");
        }
    };

    // Delete Registration
    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to cancel this registration?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            await axios.delete(`${API_URL}/${id}`);

            setRegistrations(
                registrations.filter(
                    (registration) =>
                        registration._id !== id
                )
            );

        } catch (error) {
            console.log(error);
            setError("Failed to cancel registration");
        }
    };

    // Search + Filter
    const filteredRegistrations = registrations.filter(
        (registration) => {

            const matchesSearch =
                registration.Name
                    .toLowerCase()
                    .includes(searchText.toLowerCase()) ||
                registration.Email
                    .toLowerCase()
                    .includes(searchText.toLowerCase());

            const matchesEvent =
                selectedEvent === "All" ||
                registration.Event?._id === selectedEvent;

            return matchesSearch && matchesEvent;
        }
    );

    return (
        <div>

            <h2>Event Registrations</h2>

            {error && <p>{error}</p>}

            {/* Search */}

            <input
                type="text"
                placeholder="Search name or email"
                value={searchText}
                onChange={(e) =>
                    setSearchText(e.target.value)
                }
            />

            {/* Event Filter */}

            <select
                value={selectedEvent}
                onChange={(e) =>
                    setSelectedEvent(e.target.value)
                }
            >
                <option value="All">
                    All Events
                </option>

                {events.map((event) => (
                    <option
                        key={event._id}
                        value={event._id}
                    >
                        {event.EventName}
                    </option>
                ))}
            </select>

            <hr />

            {/* Registrations */}

            {filteredRegistrations.map(
                (registration) => (

                    <div key={registration._id}>

                        <p>
                            Registration ID:
                            {" "}
                            {registration._id}
                        </p>

                        <p>
                            Name: {registration.Name}
                        </p>

                        <p>
                            Email: {registration.Email}
                        </p>

                        <p>
                            Phone: {registration.Phone}
                        </p>

                        <p>
                            Event:
                            {" "}
                            {registration.Event?.EventName}
                        </p>

                        <p>
                            Registration Date:
                            {" "}
                            {new Date(
                                registration.RegistrationDate
                            ).toLocaleDateString()}
                        </p>

                        <p>
                            Status:
                            {" "}
                            {registration.Status}
                        </p>

                        {/* Status */}

                        <select
                            value={registration.Status}
                            onChange={(e) =>
                                handleStatusChange(
                                    registration._id,
                                    e.target.value
                                )
                            }
                        >
                            <option value="Registered">
                                Registered
                            </option>

                            <option value="Cancelled">
                                Cancelled
                            </option>

                            <option value="Attended">
                                Attended
                            </option>
                        </select>

                        <button
                            onClick={() =>
                                handleDelete(
                                    registration._id
                                )
                            }
                        >
                            Cancel Registration
                        </button>

                        <hr />

                    </div>
                )
            )}

        </div>
    );
}

export default EventRegistrations;
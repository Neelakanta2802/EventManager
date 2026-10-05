import React, { useEffect, useState } from "react";
import axios from "axios";

function Events() {

    const API_URL = "http://localhost:3000/events";

    const [events, setEvents] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [editId, setEditId] = useState(null);
    const [error, setError] = useState("");

    const [form, setForm] = useState({
        EventName: "",
        Description: "",
        EventDate: "",
        EventTime: "",
        Location: "",
        TotalSeats: "",
        AvailableSeats: "",
        EventStatus: "Upcoming"
    });

    // GET Events
    const getEvents = async () => {
        try {
            const response = await axios.get(API_URL);
            setEvents(response.data);
            setError("");
        } catch (error) {
            console.log(error);
            setError("Failed to fetch events");
        }
    };

    useEffect(() => {
        getEvents();
    }, []);

    // Handle form
    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm({
            ...form,
            [name]: value
        });
    };

    // POST Event
    const handlePost = async () => {
        try {
            const response = await axios.post(API_URL, form);

            setEvents([...events, response.data]);

            resetForm();
            setError("");

        } catch (error) {
            console.log(error);
            setError("Failed to add event");
        }
    };

    // PUT Event
    const handlePut = async (id) => {
        try {
            const response = await axios.put(
                `${API_URL}/${id}`,
                form
            );

            setEvents(
                events.map((event) =>
                    event._id === id ? response.data : event
                )
            );

            resetForm();
            setError("");

        } catch (error) {
            console.log(error);
            setError("Failed to update event");
        }
    };

    // Submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (editId) {
            await handlePut(editId);
        } else {
            await handlePost();
        }
    };

    // Edit
    const handleEdit = (event) => {
        setEditId(event._id);

        setForm({
            EventName: event.EventName,
            Description: event.Description,
            EventDate: event.EventDate
                ? event.EventDate.split("T")[0]
                : "",
            EventTime: event.EventTime,
            Location: event.Location,
            TotalSeats: event.TotalSeats,
            AvailableSeats: event.AvailableSeats,
            EventStatus: event.EventStatus
        });
    };

    // DELETE Event
    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this event?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            await axios.delete(`${API_URL}/${id}`);

            setEvents(
                events.filter((event) => event._id !== id)
            );

        } catch (error) {
            console.log(error);
            setError("Failed to delete event");
        }
    };

    // Reset form
    const resetForm = () => {
        setForm({
            EventName: "",
            Description: "",
            EventDate: "",
            EventTime: "",
            Location: "",
            TotalSeats: "",
            AvailableSeats: "",
            EventStatus: "Upcoming"
        });

        setEditId(null);
    };

    // Search
    const filteredEvents = events.filter((event) =>
        event.EventName
            .toLowerCase()
            .includes(searchText.toLowerCase())
    );

    return (
        <div>

            <h2>Events</h2>

            {error && <p>{error}</p>}

            <form onSubmit={handleSubmit}>

                <input
                    name="EventName"
                    placeholder="Event Name"
                    value={form.EventName}
                    onChange={handleChange}
                    required
                />

                <input
                    name="Description"
                    placeholder="Description"
                    value={form.Description}
                    onChange={handleChange}
                    required
                />

                <input
                    type="date"
                    name="EventDate"
                    value={form.EventDate}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="EventTime"
                    placeholder="10:00 AM"
                    value={form.EventTime}
                    onChange={handleChange}
                    required
                />

                <input
                    name="Location"
                    placeholder="Location"
                    value={form.Location}
                    onChange={handleChange}
                    required
                />

                <input
                    type="number"
                    name="TotalSeats"
                    placeholder="Total Seats"
                    value={form.TotalSeats}
                    onChange={handleChange}
                    required
                />

                <input
                    type="number"
                    name="AvailableSeats"
                    placeholder="Available Seats"
                    value={form.AvailableSeats}
                    onChange={handleChange}
                    required
                />

                <select
                    name="EventStatus"
                    value={form.EventStatus}
                    onChange={handleChange}
                >
                    <option value="Upcoming">Upcoming</option>
                    <option value="Ongoing">Ongoing</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                </select>

                <button type="submit">
                    {editId ? "Update Event" : "Add Event"}
                </button>

                {editId && (
                    <button
                        type="button"
                        onClick={resetForm}
                    >
                        Cancel
                    </button>
                )}

            </form>

            <hr />

            <input
                type="text"
                placeholder="Search events"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
            />

            <hr />

            {filteredEvents.map((event) => (

                <div key={event._id}>

                    <h3>{event.EventName}</h3>

                    <p>{event.Description}</p>

                    <p>
                        Date:{" "}
                        {new Date(event.EventDate).toLocaleDateString()}
                    </p>

                    <p>Time: {event.EventTime}</p>

                    <p>Location: {event.Location}</p>

                    <p>Total Seats: {event.TotalSeats}</p>

                    <p>Available Seats: {event.AvailableSeats}</p>

                    <p>Status: {event.EventStatus}</p>

                    <button onClick={() => handleEdit(event)}>
                        Edit
                    </button>

                    <button onClick={() => handleDelete(event._id)}>
                        Delete
                    </button>

                    <hr />

                </div>

            ))}

        </div>
    );
}

export default Events;
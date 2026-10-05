import React, { useEffect, useState } from "react";
import axios from "axios";

function Registration() {

    const EVENT_URL = "http://localhost:3000/events";
    const REGISTRATION_URL = "http://localhost:3000/registrations";

    const [events, setEvents] = useState([]);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const [form, setForm] = useState({
        Name: "",
        Email: "",
        Phone: "",
        Event: ""
    });

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
        getEvents();
    }, []);

    // Handle form changes
    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm({
            ...form,
            [name]: value
        });
    };

    // Register
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                REGISTRATION_URL,
                form
            );

            setMessage(
                `Registration successful! Registration ID: ${response.data.registrationId}`
            );

            setError("");

            setForm({
                Name: "",
                Email: "",
                Phone: "",
                Event: ""
            });

        } catch (error) {
            console.log(error);

            setError(
                error.response?.data?.message ||
                "Registration failed"
            );

            setMessage("");
        }
    };

    return (
        <div>

            <h2>Event Registration</h2>

            {message && <p>{message}</p>}

            {error && <p>{error}</p>}

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="Name"
                    placeholder="Full Name"
                    value={form.Name}
                    onChange={handleChange}
                    required
                />

                <input
                    type="email"
                    name="Email"
                    placeholder="Email"
                    value={form.Email}
                    onChange={handleChange}
                    required
                />

                <input
                    type="tel"
                    name="Phone"
                    placeholder="Phone Number"
                    value={form.Phone}
                    onChange={handleChange}
                    required
                />

                <select
                    name="Event"
                    value={form.Event}
                    onChange={handleChange}
                    required
                >
                    <option value="">
                        Select Event
                    </option>

                    {events
                        .filter((event) => event.AvailableSeats > 0)
                        .map((event) => (
                            <option
                                key={event._id}
                                value={event._id}
                            >
                                {event.EventName} -
                                {" "}
                                {event.AvailableSeats} seats
                            </option>
                        ))}
                </select>

                <button type="submit">
                    Register
                </button>

            </form>

        </div>
    );
}

export default Registration;
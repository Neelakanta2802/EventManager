import React, { useEffect, useState } from "react";
import axios from "axios";


function Dashboard() {

    const [events, setEvents] = useState([]);
    const [registrations, setRegistrations] = useState([]);

    const getData = async () => {
        try {
            const eventResponse = await axios.get(
                "http://localhost:3000/events"
            );

            const registrationResponse = await axios.get(
                "http://localhost:3000/registrations"
            );

            setEvents(eventResponse.data);
            setRegistrations(registrationResponse.data);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const totalEvents = events.length;

    const upcomingEvents = events.filter(
        (event) => event.EventStatus === "Upcoming"
    ).length;

    const totalRegistrations = registrations.length;

    const availableSeats = events.reduce(
        (total, event) => total + event.AvailableSeats,
        0
    );

    const cancelledRegistrations = registrations.filter(
        (registration) => registration.Status === "Cancelled"
    ).length;

    return (
        <div>

            <h2>Dashboard</h2>

            <div>
                <h3>Total Events</h3>
                <p>{totalEvents}</p>
            </div>

            <div>
                <h3>Upcoming Events</h3>
                <p>{upcomingEvents}</p>
            </div>

            <div>
                <h3>Total Registrations</h3>
                <p>{totalRegistrations}</p>
            </div>

            <div>
                <h3>Available Seats</h3>
                <p>{availableSeats}</p>
            </div>

            <div>
                <h3>Cancelled Registrations</h3>
                <p>{cancelledRegistrations}</p>
            </div>

        </div>
    );
}

export default Dashboard;
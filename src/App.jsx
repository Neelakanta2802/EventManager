import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    Link
} from "react-router-dom";

import Dashboard from "./Components/Dashboard/Dashboard";
import Events from "./Components/Events/Events";
import Registration from "./Components/Registration/Registration";
import EventRegistration from "./Components/EventRegistration/EventRegistration";

function App() {

    return (
        <BrowserRouter>

            <h1>Event Management System</h1>

            <nav>
                <Link to="/">Dashboard</Link>{" | "}

                <Link to="/events">Events</Link>{" | "}

                <Link to="/registration">Registration</Link>{" | "}

                <Link to="/registrations">
                    Registrations
                </Link>
            </nav>

            <hr />

            <Routes>

                <Route
                    path="/"
                    element={<Dashboard />}
                />

                <Route
                    path="/events"
                    element={<Events />}
                />

                <Route
                    path="/registration"
                    element={<Registration />}
                />

                <Route
                    path="/registrations"
                    element={<EventRegistration />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;
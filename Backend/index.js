/* eslint-disable no-undef */
const express = require("express");
const connectDB = require("./Config/db");
const app = express();
connectDB();
app.use(express.json());

app.get("/events", async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch events"
        });
    }
});

app.get("/events/:id", async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({
                message: "Event not found"
            });
        }

        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch event"
        });
    }
});

app.post("/events", async (req, res) => {
    try {
        const event = new Event(req.body);

        const savedEvent = await event.save();

        res.status(201).json(savedEvent);
    } catch (error) {
        res.status(500).json({
            message: "Failed to create event"
        });
    }
});

app.put("/events/:id", async (req, res) => {
    try {
        const event = await Event.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!event) {
            return res.status(404).json({
                message: "Event not found"
            });
        }

        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({
            message: "Failed to update event"
        });
    }
});

app.delete("/events/:id", async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);

        if (!event) {
            return res.status(404).json({
                message: "Event not found"
            });
        }

        res.status(200).json({
            message: "Event deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete event"
        });
    }
});

//Registration API

app.get("/registrations", async (req, res) => {
    try {
        const registrations = await Registration.find()
            .populate("Event");

        res.status(200).json(registrations);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch registrations"
        });
    }
});

app.post("/registrations", async (req, res) => {
    try {
        const { Name, Email, Phone, Event } = req.body;

        // 1. Check event
        const event = await Event.findById(Event);

        if (!event) {
            return res.status(404).json({
                message: "Event not found"
            });
        }

        // 2. Check available seats
        if (event.AvailableSeats <= 0) {
            return res.status(400).json({
                message: "No seats available"
            });
        }

        // 3. Check duplicate registration
        const existingRegistration = await Registration.findOne({
            Email: Email,
            Event: Event
        });

        if (existingRegistration) {
            return res.status(400).json({
                message: "Already registered for this event"
            });
        }

        // 4. Create registration
        const registration = new Registration({
            Name,
            Email,
            Phone,
            Event
        });

        const savedRegistration = await registration.save();

        // 5. Decrease available seats
        event.AvailableSeats -= 1;
        await event.save();

        // 6. Send response
        res.status(201).json({
            message: "Registration successful",
            registrationId: savedRegistration._id
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to register"
        });
    }
});


app.put("/registrations/:id", async (req, res) => {
    try {
        const registration = await Registration.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!registration) {
            return res.status(404).json({
                message: "Registration not found"
            });
        }

        res.status(200).json(registration);

    } catch (error) {
        res.status(500).json({
            message: "Failed to update registration"
        });
    }
});

app.delete("/registrations/:id", async (req, res) => {
    try {
        const registration = await Registration.findByIdAndDelete(
            req.params.id
        );

        if (!registration) {
            return res.status(404).json({
                message: "Registration not found"
            });
        }

        res.status(200).json({
            message: "Registration deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to delete registration"
        });
    }
});

app.listen(3000,()=>{
    console.log("Server is Listening on 3000");
});
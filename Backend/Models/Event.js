/* eslint-disable no-undef */
const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    EventName: {
        type: String,
        required: true
    },

    Description: {
        type: String,
        required: true
    },

    EventDate: {
        type: Date,
        required: true
    },

    EventTime: {
        type: String,
        required: true
    },

    Location: {
        type: String,
        required: true
    },

    TotalSeats: {
        type: Number,
        required: true
    },

    AvailableSeats: {
        type: Number,
        required: true
    },

    EventStatus: {
        type: String,
        required: true,
        enum: ["Upcoming", "Ongoing", "Completed", "Cancelled"]
    }
});

module.exports = mongoose.model("Event", eventSchema);
/* eslint-disable no-undef */
const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },

    Email: {
        type: String,
        required: true
    },

    Phone: {
        type: String,
        required: true
    },

    Event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        required: true
    },

    RegistrationDate: {
        type: Date,
        default: Date.now
    },

    Status: {
        type: String,
        required: true,
        enum: ["Registered", "Cancelled", "Attended"],
        default: "Registered"
    }
});

module.exports = mongoose.model("Registration", registrationSchema);
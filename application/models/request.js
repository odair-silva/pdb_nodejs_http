var mongoose = require('mongoose');

var schema = mongoose.Schema({
    opened_by: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    priority: {
        type: Number,
        default: 1
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    closed: {
        response: {
            type: Boolean,
            required: true
        },
        by: String,
        worked_minutes: Number
    }
});

mongoose.model('Request', schema);
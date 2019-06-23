const mongoose = require('mongoose');
var conn = mongoose.createConnection('mongodb://mongo:27017/hospitaleventstore');

const Event = conn.model('event', new mongoose.Schema({
    routingkey: {
        type: String,
        required: true
    },
    eventdata: {
        type: Object,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
}));

module.exports = Event;

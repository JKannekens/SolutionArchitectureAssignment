const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const EventSchema = new Schema({
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
});

const Event = mongoose.model('event', EventSchema);

module.exports = Event;

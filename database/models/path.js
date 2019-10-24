const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PathModelSchema = new Schema({
    time: {type: Number,
        required: true
    },
    start_lat: {type: Number,
        min:-90,
        max: 90,
        required: true 
    },
    start_lng: {type: Number,
        min:-90,
        max: 90,
        required: true
    },
    end_lat: {type: Number,
        min:-90,
        max: 90,
        required: true 
    },
    end_lng: {type: Number,
        min:-90,
        max: 90,
        required: true
    },
})

const Path = mongoose.model('Path', PathModelSchema);

module.exports = { Path };
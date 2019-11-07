const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ClusterModelSchema = new Schema({
    name: {type: String,
        required: true
    },
    center_lng: {type: Number,
        min:-180,
        max: 180,
        required: true 
    },
    center_lat: {type: Number,
        min:-180,
        max: 180,
        required: true
    },
    radius: {type: Number,
        min: 0,
        required: true
    },
    gen_health: {type: Number,
        min: 0,
        max: 100,
        required: true
    },
    tco_savings: {type: Number,
        required: true
    },
    
})


const Cluster = mongoose.model('Cluster', ClusterModelSchema);



module.exports = { Cluster };

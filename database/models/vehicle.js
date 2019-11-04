const mongoose = require('mongoose');
const { Battery } = require('./battery');
const { Path } = require('./path');
const { Cluster } = require('./cluster');
const { Parameter  } = require('./parameter');


const moment = require('moment');

const Schema = mongoose.Schema;

const VehicleModelSchema = new Schema({
    position_lat: {type: Number,
        min: -180,
        max: 180,
    },
    position_lng: {type: Number,
        min: -180,
        max: 180,
    },
    model: {type: String,
        required: true 
    },
    temperature: {type: Number,
        min: 0,
        max: 100,
    },
    cluster: {type: Schema.Types.ObjectId,
        ref: 'Cluster',
        required: true
    },
    parameters: [{type: Schema.Types.ObjectId,
        ref: 'Parameter',
    }],
    _battery_id: {type: Schema.Types.ObjectId,
        ref: 'Battery',
    },
    date_of_creation: {type: Date,
        required: true 
    },
    _path_id: {type: Schema.Types.ObjectId,
        ref: 'Path',
    },
})

VehicleModelSchema.virtual('age')
.get(function(){
    return (Date.now() - this.date_of_creation).toString();
});

VehicleModelSchema.virtual('url')
.get(function(){
    return '/vehicle/'+this._id;
});

const Vehicle = mongoose.model('Vehicle', VehicleModelSchema);

module.exports = { Vehicle };
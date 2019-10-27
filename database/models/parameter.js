const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ParameterModelSchema = new Schema({
    time: {type: Date,

        required: true 
    },
    performance: {type: Number,
        min: 0,
        max: 100,
        required: true
    },
    battery_charge: {type: Number,
        min: 0,
        max: 100,
        required: true
    },
    cost_value: {type: Number,
        min: 0,
        required: true
    },
    
})


const Parameter = mongoose.model('Parameter', ParameterModelSchema);



module.exports = { Parameter };

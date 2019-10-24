const mongoose = require('mongoose');
const moment = require('moment');

var Schema = mongoose.Schema;

var BatteryModelSchema = new Schema({
    name: {type: String,
        required: true
    },
    charge: {type: Number,
        min:0,
        max: 100,
        required: true 
    },
    life_span: {type: Number,
        min:0,
        max: 100,
        required: true
    },
    status: {type: String,
        enum: ['Working', 'Damaged', 'Maintenance', 'Not working']
    },
    date_of_creation: {type: Date,
        required: true
    }
})

BatteryModelSchema.virtual('age')
.get(function(){
    return (Date.now() - this.date_of_creation).toString();
});

const Battery = mongoose.model('Battery', BatteryModelSchema);



module.exports = { Battery };

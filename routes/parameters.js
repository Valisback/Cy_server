const express = require('express');
const router = express.Router();

//Load in the mongoose models 
const { Parameter } = require('../database/models');

// Require controller module
var parameter_controller = require('../controllers/parameterController');


// GET request for one parameter.
router.get('/:id', parameter_controller.parameter_detail);
router.get('/all/:date', parameter_controller.all_last_parameter);
router.get('/vehicle/:vehicle_id', parameter_controller.vehicle_param);
router.get('/vehicle/:vehicle_id/:date', parameter_controller.param_of_vehicle_and_date);
router.get('/vehicle/:vehicle_id/:date1/:date2', parameter_controller.param_of_vehicle_between_dates);

module.exports = router;
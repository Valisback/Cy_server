const express = require('express');
const router = express.Router();

//Load in the mongoose models 
const { Parameter } = require('../database/models');

// Require controller module
var parameter_controller = require('../controllers/parameterController');


// GET request for one parameter.
router.get('/:id', parameter_controller.parameter_detail);
router.get('/vehicle/:vehicle_id', parameter_controller.vehicle_param);



module.exports = router;
const express = require('express');
const router = express.Router();

//Load in the mongoose models 
const { Vehicle } = require('../database/models');

// Require controller module
var vehicle_controller = require('../controllers/vehicleController');




// GET request for creating a vehicle
router.get('/create', vehicle_controller.vehicle_create_get);

// POST request for creating vehicle.
router.post('/create', vehicle_controller.vehicle_create_post);

// GET request to delete vehicle.
router.get('/:id/delete', vehicle_controller.vehicle_delete_get);

// POST request to delete vehicle.
router.post('/:id/delete', vehicle_controller.vehicle_delete_post);

// GET request to update vehicle.
router.get('/:id/update', vehicle_controller.vehicle_update_get);

// POST request to update vehicle.
router.post('/:id/update', vehicle_controller.vehicle_update_post);

// GET request for one vehicle.
router.get('/:id', vehicle_controller.vehicle_detail);

// GET request for list of all vehicle items.
router.get('/', vehicle_controller.vehicle_list);

// GET request for list of all vehicle in a specific cluster.
router.get('/cluster/:cluster', vehicle_controller.vehicle_cluster_list);

module.exports = router;
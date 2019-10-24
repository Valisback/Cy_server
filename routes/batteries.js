const express = require('express');
const router = express.Router();

//Load in the mongoose models 
const { Battery } = require('../database/models');

// Require controller module
var battery_controller = require('../controllers/batteryController');

// GET request for creating a battery
router.get('/status', battery_controller.battery_statuses);

// GET request for creating a battery
router.get('/create', battery_controller.battery_create_get);

// POST request for creating battery.
router.post('/create', battery_controller.battery_create_post);

// GET request to delete battery.
router.get('/:id/delete', battery_controller.battery_delete_get);

// POST request to delete battery.
router.post('/:id/delete', battery_controller.battery_delete_post);

// GET request to update battery.
router.get('/:id/update', battery_controller.battery_update_get);

// POST request to update battery.
router.post('/:id/update', battery_controller.battery_update_post);

// GET request for one battery.
router.get('/:id', battery_controller.battery_detail);

// GET request for list of all battery items.
router.get('/', battery_controller.battery_list);

module.exports = router;
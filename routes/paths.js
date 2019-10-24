const express = require('express');
const router = express.Router();

//Load in the mongoose models 
const { Path } = require('../database/models');

// Require controller module
var path_controller = require('../controllers/pathController');


// GET request for creating a path
router.get('/create', path_controller.path_create_get);

// POST request for creating path.
router.post('/create', path_controller.path_create_post);

// GET request to delete path.
router.get('/:id/delete', path_controller.path_delete_get);

// POST request to delete path.
router.post('/:id/delete', path_controller.path_delete_post);

// GET request to update path.
router.get('/:id/update', path_controller.path_update_get);

// POST request to update path.
router.post('/:id/update', path_controller.path_update_post);

// GET request for one path.
router.get('/:id', path_controller.path_detail);

// GET request for list of all path items.
router.get('/', path_controller.path_list);

module.exports = router;
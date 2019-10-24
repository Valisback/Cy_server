const express = require('express');
const router = express.Router();

//Load in the mongoose models 
const { Cluster } = require('../database/models');

// Require controller module
var cluster_controller = require('../controllers/clusterController');


// GET request for creating a cluster
router.get('/create', cluster_controller.cluster_create_get);

// POST request for creating cluster.
router.post('/create', cluster_controller.cluster_create_post);

// GET request to delete cluster.
router.get('/:id/delete', cluster_controller.cluster_delete_get);

// POST request to delete cluster.
router.post('/:id/delete', cluster_controller.cluster_delete_post);

// GET request to update cluster.
router.get('/:id/update', cluster_controller.cluster_update_get);

// POST request to update cluster.
router.post('/:id/update', cluster_controller.cluster_update_post);

// GET request for one cluster.
router.get('/:id', cluster_controller.cluster_detail);

// GET request for list of all cluster items.
router.get('/', cluster_controller.cluster_list);



module.exports = router;
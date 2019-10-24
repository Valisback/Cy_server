const {Cluster} = require('../database/models');

// Display list of all clusters.
exports.cluster_list = function(req, res, next) {
    Cluster.find({})
    .exec(function (err, list_clusters) {
        if (err) { return next(err); }
        //Successful, so render
        res.json({ title: 'cluster List', cluster_list: list_clusters });
      });
};

// Display detail page for a specific cluster.
exports.cluster_detail = function(req, res) {
    Cluster.findById(req.params.id)
    .exec(function (err, cluster) {
        if (err) { return next(err); }
        //Successful, so render
        res.json({ title: 'cluster', cluster: cluster });
      });};

// Display cluster create form on GET.
exports.cluster_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: cluster create GET');
};

// Handle cluster create on POST.
exports.cluster_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: cluster create POST');
};

// Display cluster delete form on GET.
exports.cluster_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: cluster delete GET');
};

// Handle cluster delete on POST.
exports.cluster_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: cluster delete POST');
};

// Display cluster update form on GET.
exports.cluster_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: cluster update GET');
};

// Handle cluster update on POST.
exports.cluster_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: cluster update POST');
};
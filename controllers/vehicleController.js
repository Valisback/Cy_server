const {Vehicle, Battery} = require('../database/models');

// Display list of all vehicles.
exports.vehicle_list = function(req, res, next) {
    Vehicle.find({})
    .populate('_battery_id')
    .populate('_path_id')
    .exec(function (err, list_vehicle) {
        if (err) { return next(err); }
        //Successful, so render
        res.json({ title: 'Vehicle List', vehicle_list: list_vehicle });
      });
};

exports.vehicle_cluster_list = function(req, res, next) {
    Vehicle.find({cluster: req.params.cluster})
    .populate('_battery_id')
    .populate('_path_id')
    .exec(function (err, list_cluster_vehicle) {
        if (err) { return next(err); }
        //Successful, so render
        res.json({ title: 'Vehicle List', vehicle_list: list_cluster_vehicle });
      });
};

// Display detail page for a specific vehicle.
exports.vehicle_detail = function(req, res, next) {
    Vehicle.findById(req.params.id)
    .exec(function (err, vehicle) {
        if (err) { return next(err); }
        //Successful, so render
        res.json({ title: 'Vehicle ', vehicle: vehicle });
      });

};

// Display vehicle create form on GET.
exports.vehicle_create_get = function(req, res, next) {
    Vehicle.find({}, 'model')
    .exec(function (err, list_batteries) {
        if (err) { return next(err); }
        //Successful, so render
        res.json({ title: 'Battery List', book_list: list_batteries });
      });
};

// Handle vehicle create on POST.
exports.vehicle_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: vehicle create POST');
};

// Display vehicle delete form on GET.
exports.vehicle_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: vehicle delete GET');
};

// Handle vehicle delete on POST.
exports.vehicle_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: vehicle delete POST');
};

// Display vehicle update form on GET.
exports.vehicle_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: vehicle update GET');
};

// Handle vehicle update on POST.
exports.vehicle_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: vehicle update POST');
};
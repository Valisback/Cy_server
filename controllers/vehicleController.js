const {Vehicle, Parameter} = require('../database/models');

// Display list of all vehicles.
exports.vehicle_list = function(req, res, next) {
    var start = new Date();
    start_year = start.getFullYear();
    start_month = start.getMonth();
    end_month = start_month + 1;
    start = new Date(start_year, start_month);
    var end = new Date(start_year, end_month);
    Vehicle.find({})
    .populate({path: 'parameters', match: {time: {$gte: start, $lt: end}}})
    .populate('cluster')
    .populate('_battery_id')
    .populate('_path_id')
    .exec(function (err, list_vehicle) {
        if (err) { return next(err); }
        //Successful, so render
        res.json({ title: 'Vehicle List', vehicle_list: list_vehicle });
      });
};

// List of vehicles for a specific cluster
exports.vehicle_cluster_list = function(req, res, next) {
    var start = new Date();
    start_year = start.getFullYear();
    start_month = start.getMonth();
    end_month = start_month + 1;
    start = new Date(start_year, start_month);
    var end = new Date(start_year, end_month);
    Vehicle.find({cluster: req.params.cluster})
    .populate({path: 'parameters', match: {time: {$gte: start, $lt: end}}})
    .populate('cluster')
    .populate('_battery_id')
    .populate('_path_id')
    .exec(function (err, list_cluster_vehicle) {
        if (err) { return next(err); }
        //Successful, so render
        res.json({ title: 'Vehicle List', vehicle_list: list_cluster_vehicle });
      });
};

// Returns vehicle corresponding to specific model
exports.vehicle_model = function(req, res, next) {
    var start = new Date();
    start_year = start.getFullYear();
    start_month = start.getMonth();
    end_month = start_month + 1;
    start = new Date(start_year, start_month);
    var end = new Date(start_year, end_month);
    Vehicle.find({model: req.params.model})
    .populate({path: 'parameters', match: {time: {$gte: start, $lt: end}}})
    .populate('cluster')
    .populate('_battery_id')
    .populate('_path_id')
    .exec(function (err, matching_vehicle) {
        if (err) { return next(err); }
        //Successful, so render
        res.json({ title: 'Vehicle List', vehicle: matching_vehicle });
      });
};


// Display detail page for a specific vehicle.
exports.vehicle_detail = function(req, res, next) {
    var start = new Date();
    start_year = start.getFullYear();
    start_month = start.getMonth();
    end_month = start_month + 1;
    start = new Date(start_year, start_month);
    var end = new Date(start_year, end_month);
    Vehicle.findById(req.params.id)
    .populate({path: 'parameters', match: {time: {$gte: start, $lt: end}}})
    .populate('cluster')
    .populate('_battery_id')
    .populate('_path_id')
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
const {Parameter, Vehicle} = require('../database/models');

const async = require('async');

// Display details for one parameter.
exports.parameter_detail = function(req, res, next) {
    Parameter.find({_id: req.params.id})
    .exec(function (err, parameter_details) {
        if (err) { return next(err); }
        //Successful, so render
        res.json({ title: 'Parameter', param_details: parameter_details });
      });
};

// Returns list of parameters for a specific vehicle
exports.vehicle_param = function(req, res, next) {
    Parameter.find({vehicle: req.params.vehicle_id})
    .exec(function (err, parameter_match) {
        if (err) { return next(err); }

        res.json({ title: 'Parameters', parameters: parameter_match });
      });
};

exports.vehicle_parameters = function(req, res, next) {
    Parameter.find({id: req.params.cluster})
    .populate('_battery_id')
    .populate('_path_id')
    .exec(function (err, list_cluster_vehicle) {
        if (err) { return next(err); }
        //Successful, so render
        res.json({ title: 'Vehicle List', vehicle_list: list_cluster_vehicle });
      });
};
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

//Return parameters of the vehicle at a specific date
exports.param_of_vehicle_and_date = function(req, res, next) {
  var start = new Date(req.params.date);
  start_year = start.getFullYear();
  start_month = start.getMonth();
  end_month = start_month + 1;
  start = new Date(start_year, start_month);
  var end = new Date(start_year, end_month);
    Parameter.find({$and:[{vehicle: req.params.vehicle_id},{time: {$gte: start, $lt: end}}]})
    .exec(function (err, parameter_match) {
        if (err) { return next(err); }
        //Successful, so render
        res.json({ title: 'Parameters', parameters: parameter_match });
      });
};

//Return parameters of the vehicle between 2 dates
exports.param_of_vehicle_between_dates = function(req, res, next) {
    Parameter.find({$and:[{vehicle: req.params.vehicle_id},{time: {"$gte": req.params.date1, "$lt": req.params.date2}}]})
    .exec(function (err, parameter_match) {
        if (err) { return next(err); }
        //Successful, so render
        res.json({ title: 'Parameters', parameters: parameter_match });
      });
};
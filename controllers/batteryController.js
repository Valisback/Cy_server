const {Battery} = require('../database/models');

const async = require('async');

// Display list of all batteries.
exports.battery_statuses = function(req, res) {
    async.parallel({
        battery_working: function(callback) {
            Battery.countDocuments({status: 'Working'}, callback);
        },
        battery_damaged: function(callback) {
            Battery.countDocuments({status: 'Damaged'}, callback);
        },
        battery_not_working: function(callback) {
            Battery.countDocuments({status: 'Maintenance'}, callback);
        }
    }, function(err, results) {
        res.status(200);
        res.json({data: results });
    });
};

exports.battery_list = function(req, res, next) {
    Battery.find({})
    .sort([['life_span', 'ascending']])
    .exec(function (err, list_batteries) {
        if (err) { return next(err); }
        //Successful, so render
        res.json({ title: 'Battery List', battery_list: list_batteries });
      });
};

// Display detail page for a specific battery.
exports.battery_detail = function(req, res) {
    Battery.findById(req.params.id)
    .exec(function (err, battery) {
        if (err) { return next(err); }
        //Successful, so render
        res.json({ title: 'Battery ', battery: battery });
      });
};
// Display battery create form on GET.
exports.battery_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: battery create GET');
};

// Handle battery create on POST.
exports.battery_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: battery create POST');
};

// Display battery delete form on GET.
exports.battery_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: battery delete GET');
};

// Handle battery delete on POST.
exports.battery_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: battery delete POST');
};

// Display battery update form on GET.
exports.battery_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: battery update GET');
};

// Handle battery update on POST.
exports.battery_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: battery update POST');
};
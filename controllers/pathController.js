const {Path} = require('../database/models');

// Display list of all Paths.
exports.path_list = function(req, res, next) {
    Path.find({})
    .exec(function (err, list_paths) {
        if (err) { return next(err); }
        //Successful, so render
        res.json({ title: 'Path List', path_list: list_paths });
      });
};

// Display detail page for a specific Path.
exports.path_detail = function(req, res) {
    Path.findById(req.params.id)
    .exec(function (err, path) {
        if (err) { return next(err); }
        //Successful, so render
        res.json({ title: 'Path', path: path });
      });};

// Display Path create form on GET.
exports.path_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Path create GET');
};

// Handle Path create on POST.
exports.path_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Path create POST');
};

// Display Path delete form on GET.
exports.path_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Path delete GET');
};

// Handle Path delete on POST.
exports.path_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Path delete POST');
};

// Display Path update form on GET.
exports.path_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Path update GET');
};

// Handle Path update on POST.
exports.path_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Path update POST');
};
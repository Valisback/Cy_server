// This file regroups all the imports from the different database models to simplify imports
const { Post } = require('./post-model');
const { Battery } = require('./battery');
const { Vehicle } = require('./vehicle');
const { Path } = require('./path');
const { Cluster } = require('./cluster');

module.exports = {
    Post,
    Battery,
    Vehicle,
    Path,
    Cluster
};
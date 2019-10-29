//Script to populate the database with some elements
const state_boundaries = require("./state_boundaries.json");

//Total number of vehicle to be generated
const NB_VEHICLE_GENERATED = 10;

// Get arguments passed on command line
var userArgs = process.argv.slice(2);

var async = require("async");
var {
  Battery,
  Vehicle,
  Path,
  Cluster,
  Parameter
} = require("./database/models/index");

var mongoose = require("mongoose");
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useUnifiedTopology: true, useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

var paths = [];
var parameters = [];
var clusters = [];
var batteries = [];
var vehicles = [];

function pathCreate(time, start_lat, start_lng, end_lat, end_lng, cb) {
  pathdetail = {
    time: time,
    start_lat: start_lat,
    start_lng: start_lng,
    end_lat: end_lat,
    end_lng: end_lng
  };
  var path = new Path(pathdetail);

  path.save(function(err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Path: " + path);
    paths.push(path);
    cb(null, path);
  });
}

function parameterCreate(time, performance, battery_charge, cost_value, cb) {
  parameterDetail = {
    time: time,
    performance: performance,
    battery_charge: battery_charge,
    cost_value: cost_value
  };
  var parameter = new Parameter(parameterDetail);

  parameter.save(function(err) {
    if (err) {
      //cb(err, null)
      console.log("error " + err);
      return;
    }
    console.log("New Parameter: " + parameter);
    parameters.push(parameter);
  });
}

function clusterCreate(name, center_lat, center_lng, radius, gen_health, cb) {
  clusterDetail = {
    name: name,
    center_lat: center_lat,
    center_lng: center_lng,
    radius: radius,
    gen_health,
    gen_health
  };
  var cluster = new Cluster(clusterDetail);

  cluster.save(function(err) {
    if (err) {
      //cb(err, null)
      console.log(err);
      return;
    }
    console.log("New Cluster: " + cluster);
    clusters.push(cluster);
    //cb(null, cluster)
  });
}

function batteryCreate(name, charge, life_span, status, date_of_creation, cb) {
  batterydetail = {
    name: name,
    charge: charge,
    life_span: life_span,
    status: status,
    date_of_creation: date_of_creation
  };
  var battery = new Battery(batterydetail);

  battery.save(function(err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Battery: " + battery);
    batteries.push(battery);
    cb(null, battery);
  });
}

function vehicleCreate(
    id,
  position_lat,
  position_lng,
  model,
  cluster,
  parameters,
  _battery_id,
  date_of_creation,
  _path_id,
  cb
) {
  vehicledetail = {
    _id: id,
    position_lat: position_lat,
    position_lng: position_lng,
    model: model,
    cluster: cluster,
    parameters: parameters,
    _battery_id: _battery_id,
    date_of_creation: date_of_creation,
    _path_id: _path_id
  };

  var vehicle = new Vehicle(vehicledetail);

  vehicle.save(function(err) {
    if (err) {
      //cb(err, null)
      console.log(err);
      return;
    }
    console.log("New Vehicle: " + vehicle);
    vehicles.push(vehicle);
    //cb(null, vehicle)
  });
}

function createPaths(cb) {
  async.series(
    [
      function(callback) {
        pathCreate(120, 40.732461, 42.032461, -73.865242, -73.065242, callback);
      },
      function(callback) {
        pathCreate(90, 40.77061, 40.3461, -71.935242, -72.865242, callback);
      },
      function(callback) {
        pathCreate(103, 41.01061, 39.71061, -73.125242, -74.035242, callback);
      },
      function(callback) {
        pathCreate(64, 40.74361, 41.074361, -73.935242, -72.865242, callback);
      }
    ],
    // optional callback
    cb
  );
}

async function createParams(date_creation, random_vehicle_index, vehicle_id, cb) {
  price_list = [38990, 29900, 64535, 31990, 84990, 36950, 30315];
  random_vehicle_index = Math.floor(random_vehicle_index);
  let now = new Date();
  let performance = 100;
  let battery_charge = 100;
  let params = [];
  let cost_value = price_list[random_vehicle_index];
  for (var d = new Date(date_creation); d <= now; d.setMonth(d.getMonth() + 1)) {
    date  = new Date(d);
    performance = performance - (Math.random() * performance) / 100;
    if (battery_charge < 8) {
      battery_charge = battery_charge + Math.random() * 90;
    } else {
      battery_charge = Math.random() * battery_charge;
    }
    cost_value = cost_value - cost_value * (0.2 / 365) * (Math.random() + 0.5);
    parameterDetail = {
     vehicle: vehicle_id,
      time: date,
      performance: performance,
      battery_charge: battery_charge,
      cost_value: cost_value
    };
    params.push(new Parameter(parameterDetail));
  }
  async.parallel({
      fun: function(callback) {
        Parameter.insertMany(params, function(err, docs) {
          if (err) {
            return console.log(err);
          } else {
            console.log("Inserted in collection: " + docs);
            return docs;
          }
        });
        callback(null, params);
      }
    }, function(err, results) {
          //console.log("RESULTS ", results.fun);
    });
    return params;

}

function createClusters(cb) {
  let cluster_center_lat;
  let cluster_center_lng;
  let cluster_name;
  let cluster_radius;

  async.series(
    [
      function(callback) {
        for (let element of Object.keys(state_boundaries)) {
          cluster_center_lat =
            (state_boundaries[element].min_lat +
              state_boundaries[element].max_lat) /
            2;
          cluster_center_lng =
            (state_boundaries[element].min_lng +
              state_boundaries[element].max_lng) /
            2;
          cluster_name = state_boundaries[element].name;
          cluster_radius = getDistanceFromLatLonInKm(
            state_boundaries[element].max_lat,
            state_boundaries[element].max_lng,
            cluster_center_lat,
            cluster_center_lng
          );
          clusterCreate(
            cluster_name,
            cluster_center_lat,
            cluster_center_lng,
            cluster_radius,
            90
          );
        }
        callback();
      }
    ],
    cb
  );
}
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d * 1000;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

function createBatteries(cb) {
  async.parallel(
    [
      function(callback) {
        batteryCreate("lithium-ion", 86, 74, "Working", "2017,08,07", callback);
      },
      function(callback) {
        batteryCreate(
          "li-ion polymer",
          76,
          94,
          "Working",
          "2018,10,04",
          callback
        );
      },
      function(callback) {
        batteryCreate(
          "nickel-metal hydride",
          56,
          21,
          "Damaged",
          "2015,01,11",
          callback
        );
      },
      function(callback) {
        batteryCreate("lead acid", 21, 68, "Working", "2016,04,06", callback);
      }
    ],
    // optional callback
    cb
  );
}

async function genVehicleParams() {
  // General parameters
  const usa_lat_max = 43.5;
  const usa_lat_min = 30.35;
  const usa_lng_max = -74;
  const usa_lng_min = -120.5;
  let random_lat;
  let random_lng;
  vehicle_list = [
    "Tesla Model 3",
    "MG ZS EV",
    "Mercedes-Benz EQC",
    "Nissan Leaf",
    "Tesla Model X",
    "Hyundai Kona Electric",
    "Hyundai Ionic Electric"
  ];

  // Generation of time-dependent data
  let random_vehicle_index = Math.random() * vehicle_list.length;
  random_vehicle_index = Math.floor(random_vehicle_index);
  let chosen_model = vehicle_list[random_vehicle_index];
  let cluster;
  const start = new Date(2016, 01, 01);
  const end = new Date(2019, 09, 01);
  const date_creation_vehicle = randomDate(start, end);
  let param_array = [];
  let id = mongoose.Types.ObjectId(); //id of the vehicle
  param_array = await createParams(date_creation_vehicle,random_vehicle_index, id);
  console.log("INSSEEEEERTED", param_array);
  

  // Generation of random coordinates and cluster position
  while (!cluster) {
    random_lat = Math.random() * (usa_lat_max - usa_lat_min) + usa_lat_min;
    for (let element of Object.keys(state_boundaries)) {
      if (
        random_lat >= state_boundaries[element].min_lat &&
        random_lat < state_boundaries[element].max_lat
      ) {
        random_lng = Math.random() * (usa_lng_max - usa_lng_min) + usa_lng_min;
        if (
          random_lng >= state_boundaries[element].min_lng &&
          random_lng < state_boundaries[element].max_lng
        ) {
          cluster = state_boundaries[element].name;
          let vehicle_prop;
          thisCluster = await Cluster.findOne(
            { name: cluster },
            (err, matchingCluster) => {
              thisCluster = matchingCluster;
            }
          );
          vehicle_prop = {
            id: id,
            lat: random_lat,
            lng: random_lng,
            model: chosen_model,
            date_creation: date_creation_vehicle,
            cluster: thisCluster,
            parameters: param_array
          };

          return vehicle_prop;
        }
      }
    }
  }
}

function createVehicles(cb) {
    vehicles = [];
    
  async.parallel(
    [
      async function(callback) {
        for (let i = 0; i < NB_VEHICLE_GENERATED; i++) {
          vehicle_prop = await genVehicleParams();
          await vehicleCreate(
            vehicle_prop.id,
            vehicle_prop.lat,
            vehicle_prop.lng,
            vehicle_prop.model,
            vehicle_prop.cluster,
            vehicle_prop.parameters,
            batteries[0],
            vehicle_prop.date_creation,
            paths[0]
          );
        }
        callback();
      }
    ],
    cb
  );
}

function randomDate(start, end) {
  var date = new Date(+start + Math.random() * (end - start));
  return date;
}

function cleanDb(cb) {
  // Delete all items in current database
  async.parallel(
    [
      function(callback) {
        Vehicle.deleteMany({}, callback);
      },
      function(callback) {
        Parameter.deleteMany({}, callback);
      },
      function(callback) {
        Battery.deleteMany({}, callback);
      },
      function(callback) {
        Cluster.deleteMany({}, callback);
      },
      function(callback) {
        Path.deleteMany({}, callback);
      }
    ],

    // optional callback
    cb
  );
}

async.series(
  [
    cleanDb, //delete this line if you do not want to remove the current database collections
    //createParams,
    createClusters,
    createPaths,
    createBatteries,
    createVehicles
  ],
  // Optional callback
  function(err, results) {
    if (err) {
      //console.log('FINAL ERR: ' + err);
    } else {
      console.log("Vehicles: " + vehicles);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);

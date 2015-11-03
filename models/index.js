var config = require('../config');
var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var env = process.env.NODE_ENV || "development";

// configure the connection to the db
var sequelize = new Sequelize(config.dbUrl, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: true
  }
});

// an empty object
var db = {};

// connect to the db
sequelize
  .authenticate()
  .then(function (err) {
    console.log('Connection has been established successfully.');
  }, function (err) {
    console.log('Unable to connect to the database:', err);
  });

// import all the models in `models/` and attached as to db[models]
fs
  .readdirSync(__dirname)
  .filter(function (file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function (file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function (modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

// attach sequelize to the db object
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// export the db object
module.exports = db;
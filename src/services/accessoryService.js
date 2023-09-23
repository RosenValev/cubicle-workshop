const Accessory = require('../models/Accessory.js');

exports.create = (accessoryData) => Accessory.create(accessoryData);

exports.getAll = () => Accessory.find();

exports.getNotAttached = (accessoriesId) => Accessory.find({ _id: { $nin: accessoriesId } });
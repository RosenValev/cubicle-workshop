const uniqId = require('uniqid');
const Cube = require('../models/Cube.js');

exports.create = async (cubeData) => {
    const newCube = new Cube(cubeData);

    await newCube.save();

    return newCube;
}

exports.getOne = (cubeId) => Cube.findById(cubeId);

exports.getAll = async (search, from, to) => {
    let result = await Cube.find().lean();

    if (search) {
        result = result.filter(cube => cube.name.toLowerCase().includes(search.toLowerCase()));
    }

    if (from) {
        result = result.filter(cube => cube.difficultyLevel >= Number(from));
    }

    if (to) {
        result = result.filter(cube => cube.difficultyLevel <= Number(to));
    }

    return result;
};
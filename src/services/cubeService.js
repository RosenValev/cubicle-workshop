const Cube = require('../models/Cube.js');

exports.create = async (cubeData) => {
    const newCube = new Cube(cubeData);

    await newCube.save();

    return newCube;
}

exports.getOne = (cubeId) => Cube.findById(cubeId);

exports.getOneWithAccessories = (cubeId) => this.getOne(cubeId).populate('accessories');

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

exports.attachAccessory = async (cubeId, accessoryId) => {
    const cube = await Cube.findById(cubeId);
    cube.accessories.push(accessoryId);

    return cube.save();
}
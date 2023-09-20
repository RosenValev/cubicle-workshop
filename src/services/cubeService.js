const uniqId = require('uniqid');
const cubes = [

];

exports.create = (cubeData) => {
    const newCube = {
        id: uniqId(),
        ...cubeData,
    };

    cubes.push(newCube);
    return newCube;
}

exports.getOne = (cubeId) => cubes.find(x => x.id == cubeId);

exports.getAll = (search, from, to) => {
    let result = cubes.slice();
    console.log(result);

    if (search) {
        result.filter(cube => cube.name.toLowerCase().includes(search.toLowerCase()));
    }

    if (from) {
        result.filter(cube => cube.difficultyLevel >= Number(from));
    }

    if (to) {
        result.filter(cube => cube.difficultyLevel <= Number(to));
    }

    return result;
};
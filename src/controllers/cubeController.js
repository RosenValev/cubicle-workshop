const router = require('express').Router();
const cubeService = require('../services/cubeService.js');

router.get('/create', (req, res) => {     // Path ...../cubes/create, because of the modular routes.
    res.render('create');
})

router.post('/create', (req, res) => {
    const {
        name,
        description,
        imageUrl,
        difficultyLevel,
    } = req.body;

    cubeService.create({
        name,
        description,
        imageUrl,
        difficultyLevel: Number(difficultyLevel),
    });

    res.redirect('/')
});


module.exports = router;
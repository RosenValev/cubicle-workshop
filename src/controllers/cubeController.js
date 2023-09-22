const router = require('express').Router();
const cubeService = require('../services/cubeService.js');

router.get('/create', (req, res) => {     // Path ...../cubes/create, because of the modular routes.
    res.render('create');
})

router.post('/create', async (req, res) => {
    const {
        name,
        description,
        imageUrl,
        difficultyLevel,
    } = req.body;

    await cubeService.create({
        name,
        description,
        imageUrl,
        difficultyLevel: Number(difficultyLevel),
    });

    res.redirect('/')
});

router.get('/:cubeId/details', async (req, res) => {
    const cube = await cubeService.getOne(req.params.cubeId).lean();  // Using .lean() to transform the document from mangoose to object so handlebars could work

    if (!cube) {
        return res.redirect('/404');
    }

    res.render('details', { cube });
});


module.exports = router;
const router = require('express').Router();
const cubeService = require('../services/cubeService.js');
const accessoryService = require('../services/accessoryService.js');

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

    res.redirect('/');
});

router.get('/:cubeId/details', async (req, res) => {
    const cube = await cubeService.getOneWithAccessories(req.params.cubeId).lean();  // Using .lean() to transform the document from mangoose to object so handlebars could work

    if (!cube) {
        return res.redirect('/404');
    }

    res.render('details', { cube });
});


router.get('/:cubeId/attach-accessory', async (req, res) => {
    const cube = await cubeService.getOne(req.params.cubeId).lean();
    const accessories = await accessoryService.getNotAttached(cube.accessories).lean();
    const hasAccessories = accessories.length > 0;

    res.render('accessory/attach', { cube, accessories, hasAccessories });
});

router.post('/:cubeId/attach-accessory', async (req, res) => {
    const { accessory: accessoryId } = req.body;
    const cubeId = req.params.cubeId;
    await cubeService.attachAccessory(cubeId, accessoryId);

    res.redirect(`/cubes/${cubeId}/details`);
});


module.exports = router;
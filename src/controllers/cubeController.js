const router = require('express').Router();
const cubeService = require('../services/cubeService.js');
const accessoryService = require('../services/accessoryService.js');
const { getDifficultyOptionsViewData } = require('../utils/viewHelpers.js');

router.get('/create', (req, res) => {     // Path ...../cubes/create, because of the modular routes.
    console.log(req.user)
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
        owner: req.user._id
    });

    res.redirect('/');
});

router.get('/:cubeId/details', async (req, res) => {
    const cube = await cubeService.getOneWithAccessories(req.params.cubeId).lean();  // Using .lean() to transform the document from mangoose to object so handlebars could work

    if (!cube) {
        return res.redirect('/404');
    }

    const isOwner = cube.owner?.toString() === req.user?._id;

    res.render('details', { cube, isOwner });
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

router.get('/:cubeId/delete', async (req, res) => {
    const cube = await cubeService.getOne(req.params.cubeId).lean();
    const options = getDifficultyOptionsViewData(cube.difficultyLevel);

    res.render('cube/delete', { cube, options })
})

router.post('/:cubeId/delete', async (req, res) => {
    await cubeService.delete(req.params.cubeId);

    res.redirect('/');
});


router.get('/:cubeId/edit', async (req, res) => {
    const cube = await cubeService.getOne(req.params.cubeId).lean();
    const options = getDifficultyOptionsViewData(cube.difficultyLevel);
    res.render('cube/edit', { cube, options });
});

router.post('/:cubeId/edit', async (req, res) => {
    const cubeData = req.body;
    await cubeService.update(req.params.cubeId, cubeData);
    res.redirect(`/cubes/${req.params.cubeId}/details`);
});

module.exports = router;
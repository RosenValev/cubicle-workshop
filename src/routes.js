const router = require('express').Router();
const homeController = require('./controllers/homeController.js');
const cubeController = require('./controllers/cubeController.js');

router.use(homeController);   // This controller will work all the time.
router.use('/cubes', cubeController); // This controller will work only when we have req to /cubes/
router.get('*', (req, res) => {
    res.redirect('/404')
});

module.exports = router;

const router = require('express').Router();
const homeController = require('./controllers/homeController.js');
const cubeController = require('./controllers/cubeController.js');
const accessoryController = require('./controllers/accessoryController.js');
const userController = require('./controllers/userController.js');

router.use(homeController);   // This controller will work all the time.
router.use('/cubes', cubeController); // This controller will work only when we have req to /cubes/
router.use('/accessories', accessoryController);
router.use('/users', userController);
router.get('*', (req, res) => {  //Redirect everything else to page 404
    res.redirect('/404')
});

module.exports = router;

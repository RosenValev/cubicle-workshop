const router = require('express').Router();

router.get('/create', (req, res) => {
    res.render('accessory/create');
})

router.post('/create', (req, res) => {
    const { name, description, imageUrl } = req.body
    console.log({ name, description, imageUrl })

    // TODO Add accessory to DB
    res.redirect('/');

});

module.exports = router;
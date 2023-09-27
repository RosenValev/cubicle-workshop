const router = require('express').Router();


router.get('/register', (req, res) => {
    res.render('users/register');
});

router.post('/register', (req, res) => {
    const { username, password, repeatPassword } = req.body;

    console.log({username, password, repeatPassword})

    res.redirect('users/login');
});

module.exports = router;
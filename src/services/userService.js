const { Error } = require('mongoose');
const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const jwtPromises = require('../lib/jwt.js')
const { SECRET } = require('../config/config.js')

exports.register = (userData) => User.create(userData);

exports.login = async (username, password) => {

    const user = await User.findOne({ username });
    if (!user) {
        throw new Error('Cannot find username or password');
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        throw new Error('Cannot find username or password');
    }

    const payload = {
        _id: user._id,
        username: user.username,
    }

    const token = jwtPromises.sign(payload, SECRET, { expiresIn: '2d' });

    return token;
}
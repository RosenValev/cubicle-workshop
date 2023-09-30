const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        minLength: [5, 'Username must be at least 5 characters'],
        match: [/^[A-Za-z0-9]+$/, 'Username must be alphanumeric'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        match: [/^[A-Za-z0-9]+$/, 'Invalid password characters'],
        minLength: [8, 'Password must be at least 8 characters'],
    }
});

userSchema.virtual('repeatPassword')
    .set(function (value) {
        if (value !== this.password) {
            throw new Error('Password don`t match');
        }
    });

userSchema.pre('save', async function () {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
});

const User = mongoose.model('User', userSchema);

module.exports = User;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        minLength: [5, 'At least 5 characters'],
        match: [/^[A-Za-z0-9]+$/, 'Username must be alphanumeric'],
        unique: true,
    },
    password: {
        type: String,
        required: true,
        match: [/^[A-Za-z0-9]+$/, 'Invalid password characters'],
        minLength: 8,
    }
});

userSchema.virtual('repeatPassword')
    .set(function (value) {
        if (value !== this.password) {
            throw new mongoose.MongooseError('Password don`t match');
        }
    });

userSchema.pre('save', async function () {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
});

const User = mongoose.model('User', userSchema);

module.exports = User;
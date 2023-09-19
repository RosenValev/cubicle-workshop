const express = require('express');
const path = require('path');

function expressConfig(app) {
    app.use(express.static(path.resolve(__dirname, '../public')));  // Configure static files folder
    app.use(express.urlencoded({ extended: false })); // Middleware
}

module.exports = expressConfig;
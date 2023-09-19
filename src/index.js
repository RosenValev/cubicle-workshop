const express = require('express');
const handlebarsConfig = require('./config/handlebarsConfig.js');
const expressConfig = require('./config/expressConfig.js');
const homeController = require('./controllers/homeController.js')

const app = express();
const port = 5500;

handlebarsConfig(app);
expressConfig(app);



app.use(homeController)

app.listen(port, () => console.log(`Server is listening on port ${port}`));
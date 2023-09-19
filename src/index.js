const express = require('express');
const handlebarsConfig = require('./config/handlebarsConfig.js');
const expressConfig = require('./config/expressConfig.js');
const homeController = require('./controllers/homeController.js');
const cubeController = require('./controllers/cubeController.js');

const app = express();
const port = 5500;

handlebarsConfig(app);
expressConfig(app);



app.use(homeController);   // This controller will work all the time.
app.use('/cubes', cubeController); // This controller will work only when we have req to /cubes/

app.listen(port, () => console.log(`Server is listening on port ${port}`));
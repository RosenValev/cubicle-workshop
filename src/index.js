const express = require('express');
const handlebarsConfig = require('./config/handlebarsConfig.js');
const expressConfig = require('./config/expressConfig.js');
const routes = require('./routes.js');
const dbConnect = require('./config/dbConfig.js');


const app = express();
const port = 5500;

handlebarsConfig(app);
expressConfig(app);

dbConnect()
    .then(() => console.log('DB connected successfully'))
    .catch(err => console.log('DB error :', err));


app.use(routes)

app.listen(port, () => console.log(`Server is listening on port ${port}`));
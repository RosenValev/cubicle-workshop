const express = require('express');
const handlebars = require('express-handlebars');

const app = express();
const port = 5500;

//Handlebars config

app.engine('hbs', handlebars.engine({
    extname: 'hbs'
}));
app.set('view engine', 'hbs');
app.set('views', 'src/views')   //setting correct views folder, because it`s nested in src folder, not main folder

app.get('/', (req, res) => {
    res.render('index')
});


app.listen(port, () => console.log(`Server is listening on port ${port}`))
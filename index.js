const express = require('express');

const app = express();
const port = 5500;

app.get('/', (req, res) => {
    res.send('Zdrasti pich')
});


app.listen(port, () => console.log(`Server is listening on port ${port}`))
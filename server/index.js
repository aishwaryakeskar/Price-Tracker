const express = require('express')
const app = express()
const port = 3000

const bodyParser = require('body-parser');

const scrapers = require('./scrapers');

app.use(bodyParser.json())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // disabled for security on local
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.get('/item', async (req, res) => {
    const item = {name:'Book', price: 10, img: 'https://'};
    res.send(item)
})

app.post('/item', async (req, res) => {
    console.log(req.body)
    const itemData = await scrapers.trackPrice(req.body.itemURL)
    res.send('success');
})

app.listen(port, () => console.log(`App listening on port ${port}!`))
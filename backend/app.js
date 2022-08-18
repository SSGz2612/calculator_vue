const express = require('express');
const app = express();
const cors = require('cors');
// file
const config = require('./data.json');
app.use(cors());

app.get("/", (req, res) => {
    res.send(config);
});

app.listen(4000, () => {
    console.log('listening on port 4000');
});
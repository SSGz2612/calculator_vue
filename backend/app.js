const express = require('express');
const app = express();
const cors = require('cors');
// file
const config = require('./data.json');
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send(config);
});

app.post("/", (req, res) => {
    console.log(req.body);
    let j = req.body;
    
    res.json({
        status: "success"
    });
});

app.listen(4000, () => {
    console.log('listening on port 4000');
});
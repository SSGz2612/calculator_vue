const express = require('express');
const app = express();
const cors = require('cors');
// file
const fs = require('fs');
const config = require('./data.json');

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send(config);
});

app.post("/", (req, res) => {
    let js = req.body;
    
    let jsJson = JSON.stringify(js);
    
    fs.readFile("data.json", "utf-8", (e, d) => {
        if(e) throw(e);
        
        let dObj = JSON.parse(d);
        dObj.info.push(js);
        let nObj = JSON.stringify(dObj);

        fs.writeFile("data.json", nObj, (e) => {
            if(e) throw(e);
        });
    })

    res.json({
        status: "success"
    });
});

app.listen(4000, () => {
    console.log('listening on port 4000');
});
const express = require('express');
const path = require('path');
let fs = require('fs');
const bodyParser = require('body-parser');

let app = express();
console.log('app started');

// middleware
app.use((req, res, next) => {
    console.log(req.originalUrl);
    next();
});

// form parsing 
app.use(bodyParser.urlencoded( {extended: false}));
let dataPath = path.join(__dirname, '../form-data.json');
app.post('/contact-form', (req, res) => {
    // tried to write data to json, then output all data to res
    // but couldn't get it
    fs.readFile(dataPath, {encoding: "UTF-8"}, function (err, data) {
        let jsonData = JSON.parse(data)
        let newInfo = {name: req.body.name, email: req.body.email};
        if (jsonData) jsonData.push(newInfo);
        else jsonData = newInfo;     
        console.log(jsonData);

        fs.writeFile(dataPath, JSON.stringify(jsonData), err => {
            if (err) console.log(err);
        });
        res.write('Thanks for your info, ' + req.body.name + '!');
        res.write('\nEmail: ' + req.body.email);

        jsonData.forEach(element => {
            res.write('\n\nUser: ' + element.name + ' - ' + element.email);
        });
        res.end();
    });
});

app.use(express.static(path.join(__dirname, '..')));

app.listen(3000);
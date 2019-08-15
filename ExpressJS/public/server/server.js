const express = require('express');
const path = require('path');
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

app.post('/contact-form', (req, res) => {
    console.log(req.body.email);
    console.log(req.body.name);
});

// app.get('/', (req, res) => {
//      res.sendFile(path.join(__dirname, '../index.html'));
// });

app.use(express.static(path.join(__dirname, '..')));

app.listen(3000);
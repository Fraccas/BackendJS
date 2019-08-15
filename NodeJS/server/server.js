let path = require('path');
let fs = require('fs');

let dataPath = path.join(__dirname, '../chirps.json');

let chirps = [
    {
        name: 'Jack',
        msg: 'Lets gooooo'
    },
    {
        name: 'Fraccas', 
        msg: 'Welcome to the site!'
    },
    {
        name: 'John', 
        msg: 'Best site ever'
    },
    {
        name: 'Luke',
        msg: 'Well written code mang'
    },
    {
        name: 'Pops',
        msg: 'I like Twitter better...'
    }
]

// write array to json file
fs.writeFile(dataPath, JSON.stringify(chirps), err => {
    if (err) console.log(err);
});

// read data from json and output to console
fs.readFile(dataPath, {
    encoding: "UTF-8"
}, (err, data) => {
    let chirpsData = JSON.parse(data);

    console.log(chirpsData);
});
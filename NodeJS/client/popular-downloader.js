const path = require('path');
const fs = require('fs');
const request = require('request');

let dataPath = path.join(__dirname, '../downloads/');

// get all popular articles from reddit
request('https://reddit.com/r/popular.json', (err, res, body) => {
    if (err) console.log(err);
    
    // loop through each json article 
    JSON.parse(body).data.children.forEach(item => {
        let art = item.data.url;
        let id = item.data.id;
        // check if article is media
        if (path.extname(art) === '.jpg' || path.extname(art) === '.gif' || path.extname(art) === '.png') {
            request(art, {encoding: 'binary'}, (err, res, body) => {
                // store media to downloads folder
                fs.writeFile(dataPath + id + path.extname(art), body, 'binary', err => {
                    if (err) console.log(err);
                });
            });
        }
    });
});

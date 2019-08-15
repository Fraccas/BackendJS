const path = require('path');
const fs = require('fs');
const request = require('request');

let dataPath = path.join(__dirname, '../popular-downloader.json');
let articles = [];

request('https://reddit.com/r/popular.json', (err, res, body) => {
    if (err) console.log(err);

    JSON.parse(body).data.children.forEach(item => {
        let art = {title: item.data.title, url: item.data.url, author: item.data.author};
        articles.push(art);
    });

    // write reddit articles to json file
    fs.writeFile(dataPath, JSON.stringify(articles), err => {
        if (err) console.log(err);
    });
});
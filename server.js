const express = require('express');
const app = express();
const request = require('request');
const bodyParser = require('body-parser');

/* allows api keys to be hidden & accesses the api key */
const dotenv = require('dotenv').config();
const key = process.env.key1


app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


/* sends the index.html file from the '/' route */
app.get('/', function(req, res) {
    res.sendFile('./public/html/index.html', { root: './' });
});


/* makes the api call to google maps */
app.post('/searchIt', function(req,res) {
    /* builds the query string*/
    let query = req.body.toDo + ' ' + req.body.place

    request({
        url: `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&rankby=prominence&key=${key}`
    },
    function(error, response, body) {
        if(error || (response.statusCode !== 200)) {
            console.log(`here's the error: `, error);
            console.log(`here's the status code: `, response.statusCode);
            res.send(`oops, something went wrong`)
        } else {
            let bod = JSON.parse(body)
            let top20 = Array.from(bod.results);
            console.log(top20.length);

            res.send(top20);
        }
    });
})


/* accesses the api key */
app.post('/getIt', function(req, res) {
    res.send({key:key})
});



/* -=-=-=-=-=-=- 404 catch -=-=-=-=-=-=- */
app.use(function(req,res) { // works
  res.status(404)
  res.send(`that's a 404 error, yo.`)
})

/* -=-=-=-=-=-=- app listen -=-=-=-=-=-=- */
app.listen(8080, function () {  // works
    console.log('app running on port 8080')
})

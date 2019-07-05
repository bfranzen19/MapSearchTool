const express = require('express');
const app = express();
const request = require('request');
const bodyParser = require('body-parser');
const goog = require('@google/maps');

const dotenv = require('dotenv').config();
const creds = process.env.creds


const key = process.env.key1


app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.get('/', function(req, res) {
    res.sendFile('./public/html/index.html', { root: './' });
});


app.post('/getIt', function(req, res) {
    console.log(req.body.place)
    let place = req.body.place;
    let what = req.body.what;

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

const express = require('express');
const app = express();
const request = require('request');
const bodyParser = require('body-parser');

const dotenv = require('dotenv').config();
const creds = process.env.creds

// const goog = require('googleapis');

// const googleData = require('./public/googleData');



app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.get('/', function(req, res) {
    console.log('creds -->  ', creds);
    res.sendFile('./public/html/index.html', { root: './' });
});


app.get('/test', function(req, res) {
    console.log('creds -->  ', creds);
    res.send('you did it');
});





/* -=-=-=-=-=-=- 404 catch -=-=-=-=-=-=- */
app.use(function(req,res) { // works
  res.status(404)
  res.send(`that's a 404 error, yo.`)
})

/* -=-=-=-=-=-=- app listen -=-=-=-=-=-=- */
app.listen(8081, function () {  // works
    console.log('app running on port 8081')
})

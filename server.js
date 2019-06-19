const express = require('express');
const app = express();
const request = require('request');
const bodyParser = require('body-parser');

const dotenv = require('dotenv').config();
const creds = process.env.creds

const goog = require('googleapis');

// const googleData = require('./public/googleData');



app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.get('/', function(req, res) {
    console.log('creds -->  ', creds);
    res.sendFile('./public/index.html', { root: './' });
});

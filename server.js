const express = require('express');
const app = express();
const request = require('request');
const bodyParser = require('body-parser');
const goog = require('googleapis');

// const googleData = require('./public/googleData');
const secrets = require('./secrets')
const key = secrets.key0;


app.use(express.static('./public'));

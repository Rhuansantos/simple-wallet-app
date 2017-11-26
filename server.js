const express = require('express');
const app = express();
const https = require('https');
const http = require('http');
const fs = require('fs');

const port = 3000;

app.listen(port, function () {
	console.log('server running on port:', port);
});

const appJS = require('./src/app.js');
appJS(app);
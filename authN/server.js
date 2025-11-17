const fs = require('fs');
const express = require('express');
const https = require('https');
const path = require('path');

const app = express();
app.use(express.json()); 

const webAuthnRoutes = require('./routes/webauthn');
app.use('/', webAuthnRoutes);

app.use(express.static(path.join(__dirname, 'public')));

const key = fs.readFileSync('./localhost-key.pem');
const cert = fs.readFileSync('./localhost.pem');

https.createServer({ key, cert }, app) // in this way is http secure, so encrypted TLS connection, authn, identity server
  .listen(3000, () => console.log('running at https://localhost:3000'));

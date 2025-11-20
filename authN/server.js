import https from "https"
import express from "express"
import webAuthnRoutes from "./routes/webauthn.js";
import fs from "fs"
import bodyParser from "body-parser";

const app = express();

app.use(express.json());

app.use('/webauthn', webAuthnRoutes);

app.use(express.static('public'));

const key = fs.readFileSync('./localhost-key.pem');
const cert = fs.readFileSync('./localhost.pem');

https.createServer({ key, cert }, app) // in this way is http secure, so encrypted TLS connection, authn, identity server
  .listen(3000, () => console.log('running at https://localhost:3000'));

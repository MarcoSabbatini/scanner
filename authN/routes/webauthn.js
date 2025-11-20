import express from 'express';
import {generateRegistrationOptions} from "@simplewebauthn/server";
const router = express.Router();
import base64url from "base64url";

let registeredUsers = {}; //will be replaced by DB
const challenges = {}

router.post("/generate-registration-options", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  // Generate registration options
  const options = await generateRegistrationOptions({
    rpName: "My WebAuthN App",
    rpID: "localhost",
    userID: Buffer.from(email),
    userName: email,
    attestationType: "direct",
    authenticatorSelection: {
      residentKey: "preferred",
      userVerification: "preferred",
    },
  });

  // save the challenge in memory associated with email
  challenges[email] = options.challenge;

  const optionsWithBase64 = {
    ...options,
    challenge: base64url.encode(options.challenge),
    user: {
      ...options.user,
      id: base64url.encode(Buffer.from(options.user.id)),
    },
  };

  res.json(optionsWithBase64);
});

router.get('/', (req, res) => {
  res.sendFile('index.html', { root: 'public' });
}); // gives starting html at the beginning

router.post('/register', (req, res) => {
  const {email, id, rawId, type} = req.body;

  if (!email || !id || !rawId || !type) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  registeredUsers[email] = { id, rawId, type };
  res.json({ ok: true }); // confirms registration
});

router.post("/login", (req, res) => {
  const { email } = req.body;

  if (!email || !registeredUsers[email]) {
    return res.status(400).json({ error: "User not found" });
  }

  res.json({ message: "Login successful" });
});

export default router;

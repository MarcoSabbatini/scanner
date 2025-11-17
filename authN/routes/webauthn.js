const express = require('express');
const router = express.Router();

let registeredUser = null; //will be replaced by DB

router.get('/', (req, res) => {
  res.sendFile('index.html', { root: 'public' });
}); // gives starting html at the beginning

router.post('/register', (req, res) => {
  registeredUser = req.body;
  res.json({ ok: true }); // confirms registration
});

module.exports = router;

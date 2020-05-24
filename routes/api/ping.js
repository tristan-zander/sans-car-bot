const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  console.log(Date.now() + " Ping Received");
  res.sendStatus(200);
});

module.exports = router;
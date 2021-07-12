const express = require('express');
const router = express.Router();
const AuthControllers = require('../controllers/AuthControllers');

router.post('/login', AuthControllers.connect);
module.exports = router;

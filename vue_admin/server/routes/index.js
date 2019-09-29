let express = require('express');
let router = express.Router();
let path = require('path');


router.use('/api', require('./api/index.js'))

module.exports = router;

let express = require('express');
let router = express.Router();

router.use('/upload', require('./upload'))

module.exports = router;

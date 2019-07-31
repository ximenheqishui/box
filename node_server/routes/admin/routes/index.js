let express = require('express');
let router = express.Router();

router.use('/', require('./home'))
router.use('/canvas', require('./canvas'))
router.use('/test', require('./test'))
// router.use('/login', require('./login'))

module.exports = router;
